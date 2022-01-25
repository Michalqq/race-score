package com.akbp.racescore.service;

import com.akbp.racescore.model.dto.EventDTO;
import com.akbp.racescore.model.dto.selectors.ClassesOption;
import com.akbp.racescore.model.dto.selectors.PsOption;
import com.akbp.racescore.model.dto.selectors.RefereeOption;
import com.akbp.racescore.model.dto.selectors.StageDTO;
import com.akbp.racescore.model.entity.*;
import com.akbp.racescore.model.entity.dictionary.CarClass;
import com.akbp.racescore.model.repository.*;
import com.akbp.racescore.model.repository.dictionary.CarClassRepository;
import com.akbp.racescore.security.model.entity.User;
import com.akbp.racescore.security.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventService {

    private static final String GENERAL = "GENERALNA";

    private final EventRepository eventRepository;
    private final EventTeamRepository eventTeamRepository;
    private final TeamRepository teamRepository;
    private final StageScoreRepository stageScoreRepository;
    private final UserRepository userRepository;
    private final CarClassRepository carClassRepository;
    private final EventPathsRepository eventPathsRepository;
    private final EventClassesRepository eventClassesRepository;

    private final CarService carService;

    @Autowired
    public EventService(EventRepository eventRepository,
                        EventTeamRepository eventTeamRepository,
                        StageScoreRepository stageScoreRepository,
                        UserRepository userRepository,
                        TeamRepository teamRepository,
                        CarClassRepository carClassRepository,
                        CarService carService,
                        EventPathsRepository eventPathsRepository,
                        EventClassesRepository eventClassesRepository) {
        this.eventRepository = eventRepository;
        this.eventTeamRepository = eventTeamRepository;
        this.stageScoreRepository = stageScoreRepository;
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
        this.carClassRepository = carClassRepository;
        this.eventPathsRepository = eventPathsRepository;
        this.eventClassesRepository = eventClassesRepository;

        this.carService = carService;
    }

    public List<String> getStages(Long eventId) {
        Optional<Event> eventOptional = eventRepository.findById(eventId);

        return eventOptional.get().getStages().stream()
                .sorted(Comparator.comparingLong(Stage::getStageId))
                .map(x -> x.getName())
                .collect(Collectors.toList());
    }

    public List<EventTeam> getTeams(Long eventId) {
        Optional<Event> eventOptional = eventRepository.findById(eventId);

        List<EventTeam> teams = eventOptional.get().getEventTeams().stream().sorted(Comparator.comparingInt(x -> x.getNumber())).collect(Collectors.toList());

        return teams;
    }

    public List<PsOption> getPsOptions(Long eventId) {
        Optional<Event> eventOptional = eventRepository.findById(eventId);

        return eventOptional.get().getStages().stream()
                .sorted(Comparator.comparingLong(Stage::getStageId))
                .map(x -> new PsOption(x.getName(), x.getStageId().toString(), false)).collect(Collectors.toList());
    }

    public boolean startEvent(Long eventId) {
        Optional<Event> eventOptional = eventRepository.findById(eventId);
        Event event = eventOptional.get();
        event.setStarted(true);
        eventRepository.save(event);

        return true;
    }

    private void createEmptyEventScore(Stage stage, EventTeam team) {
        StageScore stageScore = new StageScore();
        stageScore.setStageId(stage.getStageId());
        stageScore.setTeamId(team.getTeamId());
        stageScore.setTeamNumber(team.getNumber());
        stageScore.setDisqualified(false);

        stageScoreRepository.save(stageScore);
    }

    public List<EventDTO> getAll(Authentication auth) {
        List<Event> events = eventRepository.findAll();
        List<EventDTO> eventDTOS = events.stream().map(x -> new EventDTO(x)).collect(Collectors.toList());

        if (auth != null)
            return eventWithJoinedMark(eventDTOS, auth);

        return eventDTOS;
    }

    private List<EventDTO> eventWithJoinedMark(List<EventDTO> eventDTOS, Authentication auth) {
        User user = userRepository.findByUsername(auth.getName());
        if (user == null)
            return eventDTOS;

        Team team = teamRepository.findByUserId(user.getUserId());
        if (team == null)
            return eventDTOS;

        List<EventTeam> eventTeams = eventTeamRepository.findByTeamId(team.getTeamId());
        for (EventTeam et : eventTeams) {
            eventDTOS.stream().filter(event -> event.getEventId() == et.getEventId()).findAny().ifPresent(x -> x.setJoined(true));
        }

        return eventDTOS;
    }

    public List<ClassesOption> getClasses(Long eventId) {
        List<ClassesOption> classesOptions = new ArrayList<>();
        classesOptions.add(new ClassesOption(GENERAL, "0", true));
        List<String> test = eventRepository.findDistinctClasses(eventId);

        classesOptions.addAll(
                eventRepository.findDistinctClasses(eventId).stream()
                        .sorted().collect(Collectors.toList()).stream()
                        .map(x -> new ClassesOption(x, x, false)).collect(Collectors.toList()));

        return classesOptions;
    }

    public void addTeamToEvent(Team team, Long eventId) {
        int number = eventTeamRepository.getMaxNumberByEventId(eventId);

        team = teamRepository.save(team);

        EventTeam et = eventTeamRepository.findByEventIdAndTeamId(eventId, team.getTeamId());
        Event event = eventRepository.getById(eventId);

        if (et == null)
            et = new EventTeam();

        et.setJoinDate(Instant.now());
        et.setTeamId(team.getTeamId());
        et.setEventId(eventId);
        et.setNumber(number + 1);
        eventTeamRepository.save(et);

        carService.calculateClass(team, et, event);
        eventTeamRepository.save(et);

        for (Stage stage : event.getStages())
            createEmptyEventScoreIfNeccesarry(stage, et);
    }

    @Transactional
    public void removeTeam(Long eventId, Long teamId) {
        try {
            stageScoreRepository.removeStageScoresByTeamIdAndEventId(eventId, teamId);
            eventTeamRepository.deleteByEventIdAndTeamId(eventId, teamId);

            Event event = eventRepository.getById(eventId);
            event.getStages().stream().forEach(x -> stageScoreRepository.deleteByStageIdAndTeamId(x.getStageId(), teamId));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public void confirmEntryFee(Long eventId, Long teamId) {
        EventTeam eventTeam = eventTeamRepository.findByEventIdAndTeamId(eventId, teamId);
        eventTeam.setEntryFeePaid(true);
        eventTeamRepository.save(eventTeam);
    }

    @Transactional
    public boolean createNew(Event event) {
        eventPathsRepository.deleteByEventId(event.getEventId());
        eventClassesRepository.deleteByEventId(event.getEventId());
        eventRepository.save(event);

        List<EventTeam> eventTeams = eventTeamRepository.findByEventId(event.getEventId());

//        for (Stage stage : event.getStages()) {
//            eventTeams.stream().forEach(x -> createEmptyEventScoreIfNeccesarry(stage, x));
//        }
        return true;
    }

    private void createEmptyEventScoreIfNeccesarry(Stage stage, EventTeam et) {
        if (stageScoreRepository.findByStageIdAndTeamId(stage.getStageId(), et.getTeamId()) == null)
            createEmptyEventScore(stage, et);
    }

    public boolean checkReferee(Long eventId, Authentication auth) {
        if (auth == null)
            return false;

        Optional<Event> optionalEvent = eventRepository.checkIfUserIsReferee(eventId, auth.getName());
        return optionalEvent.isPresent();
    }

    public List<RefereeOption> getRefereeOptions() {
        List<User> users = userRepository.findAll();
        return users.stream().map(x -> new RefereeOption(x)).collect(Collectors.toList());
    }

    public EventDTO getEvent(Long eventId) {
        Event event = eventRepository.getById(eventId);
        EventDTO eventDTO = new EventDTO(event);
        eventDTO.setStages(event.getStages().stream().map(x -> new StageDTO(x)).collect(Collectors.toList()));
        eventDTO.setReferee(event.getReferee());

        return eventDTO;
    }

    public Boolean deleteEvent(Long eventId) {
        eventRepository.deleteById(eventId);
        return true;
    }

    public boolean saveFile(MultipartFile file, Long eventId, Long teamId) throws Exception {
        EventTeam eventTeam = eventTeamRepository.findByEventIdAndTeamId(eventId, teamId);
        eventTeam.setEntryFeeFile(file.getBytes());
        eventTeamRepository.save(eventTeam);

        return true;
    }

    public ResponseEntity<byte[]> getFile(Long eventId, Long teamId) {
        EventTeam eventTeam = eventTeamRepository.findByEventIdAndTeamId(eventId, teamId);

        if (eventTeam == null)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.set("Content-Disposition", "attachment; filename=" + "potwierdzenie_wplaty_" + teamId);
        headers.setContentLength(eventTeam.getEntryFeeFile().length);

        return new ResponseEntity<>(eventTeam.getEntryFeeFile(), headers, HttpStatus.OK);
    }

    public List<EventTeam> sortByClass(Long eventId) {
        List<EventTeam> teams = getTeams(eventId);

        int number = teams.size();

        teams.sort(Comparator.comparing(x -> x.getCarClassId()));
        List<EventTeam> reversedTeams = new ArrayList<>();
        for (EventTeam team : teams) {
            team.setNumber(number--);
            reversedTeams.add(0, team);
        }

        return reversedTeams;
    }

    public boolean saveNumbers(List<EventTeam> teams) {
        teams.stream().forEach(x -> eventTeamRepository.save(x));

        return true;
    }

    public List<ClassesOption> getEventClassesOptions() {
        List<CarClass> classes = carClassRepository.findAll();
        return classes.stream()
                .map(x -> new ClassesOption(x.getName(), String.valueOf(x.getCarClassId()), false))
                .collect(Collectors.toList());
    }
}
