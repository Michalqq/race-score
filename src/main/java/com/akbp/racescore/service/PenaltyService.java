package com.akbp.racescore.service;

import com.akbp.racescore.model.dto.PenaltyByTeamDTO;
import com.akbp.racescore.model.dto.PenaltyDTO;
import com.akbp.racescore.model.dto.selectors.PenaltyOption;
import com.akbp.racescore.model.entity.Penalty;
import com.akbp.racescore.model.entity.StageScore;
import com.akbp.racescore.model.entity.dictionary.PenaltyDict;
import com.akbp.racescore.model.repository.PenaltyRepository;
import com.akbp.racescore.model.repository.StageScoreRepository;
import com.akbp.racescore.model.repository.dictionary.PenaltyDictRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PenaltyService {
    private final PenaltyRepository penaltyRepository;
    private final PenaltyDictRepository penaltyDictRepository;
    private final StageScoreRepository stageScoreRepository;

    private static final Long CUSTOM_PENALTY_ID = 100L;
    private static final Long TARIFF_PENALTY_ID = 10L;

    @Autowired
    public PenaltyService(PenaltyRepository penaltyRepository,
                          PenaltyDictRepository penaltyDictRepository,
                          StageScoreRepository stageScoreRepository) {
        this.penaltyRepository = penaltyRepository;
        this.penaltyDictRepository = penaltyDictRepository;
        this.stageScoreRepository = stageScoreRepository;
    }

    @Transactional
    public Long addPenalty(Penalty penalty, Long seconds) {
        PenaltyDict penaltyDict = penaltyDictRepository.getById(penalty.getPenaltyKind());
        if (penaltyDict.getDisqualification())
            setDisualifiedInStageScores(penalty, true);

        penalty.setPenaltyDict(penaltyDict);
        penalty.setPenaltySec(seconds == 0L ? penaltyDict.getPenaltySec() : seconds);
        penalty.setDescription(generateDescription(penaltyDict, penalty));

        penaltyRepository.save(penalty);

        if (penalty.getPenaltyDict().getId() == TARIFF_PENALTY_ID)
            addPenaltyToScore(penalty);

        return 1L;
    }

    private void addPenaltyToScore(Penalty penalty) {
        List<StageScore> stageScore = stageScoreRepository.findByStageIdAndTeamId(penalty.getStageId(), penalty.getTeamId());
        if (stageScore.isEmpty()) return;

        stageScore.stream().peek(x -> x.setPenalty(penalty.getPenaltySec())).forEach(x -> stageScoreRepository.save(x));
    }

    private String generateDescription(PenaltyDict penaltyDict, Penalty penalty) {
        if (penaltyDict.getId() == CUSTOM_PENALTY_ID)
            return penalty.getDescription();

        return penaltyDict.getDescription() +
                (penalty.getDescription() == null || penalty.getDescription().isEmpty()
                        ? "" : " (" + penalty.getDescription() + ")");
    }

    public List<PenaltyByTeamDTO> getPenalties(Long eventId) {
        List<PenaltyDTO> penalties = penaltyRepository.findAllByEventIdAndDisqualification(eventId, false);
        return preparePenaltyByTeamDTO(penalties);
    }

    public List<PenaltyByTeamDTO> getDisqualifications(Long eventId) {
        List<PenaltyDTO> disqualifications = penaltyRepository.findAllByEventIdAndDisqualification(eventId, true);
        return preparePenaltyByTeamDTO(disqualifications);
    }

    public List<PenaltyByTeamDTO> preparePenaltyByTeamDTO(List<PenaltyDTO> penalties) {
        List<PenaltyByTeamDTO> penaltyDTOS = new ArrayList<>();
        for (PenaltyDTO penalty : penalties) {
            if (penaltyDTOS.stream().filter(x -> x.getNumber() == penalty.getNumber()).findAny().isPresent())
                continue;

            List<PenaltyDTO> teamPenalties = penalties.stream()
                    .filter(x -> x.getNumber() == penalty.getNumber())
                    .sorted(Comparator.comparingInt(x -> x.getNumber()))
                    .collect(Collectors.toList());
            penaltyDTOS.add(new PenaltyByTeamDTO(penalty.getDriver(), penalty.getCoDriver(), penalty.getNumber(), teamPenalties));
        }
        return penaltyDTOS.stream().sorted(Comparator.comparingInt(x -> x.getNumber())).collect(Collectors.toList());
    }

    public boolean removePenalty(Long penaltyId) {
        penaltyRepository.deleteById(penaltyId);
        return true;
    }

    public List<PenaltyOption> getPenaltyOptions() {
        return penaltyDictRepository.findAllByOrderById().stream()
                .map(x -> new PenaltyOption(createPenaltyDesc(x), String.valueOf(x.getId()), false))
                .collect(Collectors.toList());
    }

    private String createPenaltyDesc(PenaltyDict x) {
        if (x.getId() == CUSTOM_PENALTY_ID || x.getId() == TARIFF_PENALTY_ID || x.getDisqualification())
            return x.getDescription();

        return x.getDescription() + " [" + x.getPenaltySec() + "s]";
    }

    public boolean removeDisqualification(Long penaltyId) {
        Penalty penalty = penaltyRepository.getById(penaltyId);
        setDisualifiedInStageScores(penalty, false);
        removePenalty(penaltyId);
        return true;
    }

    public boolean removeDisqualification(Penalty penalty) {
        setDisualifiedInStageScores(penalty, false);
        penaltyRepository.delete(penalty);
        return true;
    }

    private void setDisualifiedInStageScores(Penalty penalty, boolean disqualified) {
        List<StageScore> stageScores = stageScoreRepository.findByTeamIdAndStageIdGreaterThanEqual(penalty.getTeamId(), penalty.getStageId());
        stageScores.stream().forEach(x -> {
            x.setDisqualified(disqualified);
            stageScoreRepository.save(x);
        });
    }
}
