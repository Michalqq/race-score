package com.akbp.racescore.controller;

import com.akbp.racescore.model.dto.EventDTO;
import com.akbp.racescore.model.dto.StgesAndClassesDTO;
import com.akbp.racescore.model.dto.selectors.ClassesOption;
import com.akbp.racescore.model.dto.selectors.PsOption;
import com.akbp.racescore.model.dto.selectors.RefereeOption;
import com.akbp.racescore.model.entity.Event;
import com.akbp.racescore.model.entity.EventTeam;
import com.akbp.racescore.service.EventService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping(value = "/event", method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin("*")
public class EventController {

    private static final Logger LOGGER = LoggerFactory.getLogger(EventController.class);

    private static final String GENERAL = "GENERALNA";

    private final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/getAll")
    public List<EventDTO> getAll(Authentication auth) {
        try {
            return eventService.getAll(auth);
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }
        return Collections.emptyList();
    }

    @PostMapping("/startEvent")
    public boolean startEvent(@RequestParam("eventId") Long eventId) {
        try {
            return eventService.startEvent(eventId);
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }
        return false;
    }

    @GetMapping("/getStages")
    public List<String> getStages(@RequestParam("eventId") Long eventId) {
        try {
            return eventService.getStages(eventId);
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }
        return Collections.emptyList();
    }

    @GetMapping("/getTeams")
    public List<EventTeam> getTeams(@RequestParam("eventId") Long eventId) {
        try {
            return eventService.getTeams(eventId);
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }
        return Collections.emptyList();
    }

    @GetMapping("/getPsOptions")
    public List<PsOption> getPsOptions(@RequestParam("eventId") Long eventId) {
        try {
            return eventService.getPsOptions(eventId);
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }
        return Collections.emptyList();
    }

    @GetMapping("/getStagesAndClasses")
    public StgesAndClassesDTO getStagesAndClasses(@RequestParam("eventId") Long eventId) {
        try {
            List<PsOption> psOptions = eventService.getPsOptions(eventId);
            List<ClassesOption> classes = eventService.getClasses(eventId);
            StgesAndClassesDTO sacDTO = new StgesAndClassesDTO(psOptions, classes);
            return sacDTO;
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }
        return null;

    }

    @PostMapping("/removeTeam")
    public boolean removeTeam(@RequestParam("eventId") Long eventId, @RequestParam("teamId") Long teamId) {
        try {
            eventService.removeTeam(eventId, teamId);
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }
        return true;
    }

    @PostMapping("confirmEntryFee")
    public boolean confirmEntryFee(@RequestParam("eventId") Long eventId, @RequestParam("teamId") Long teamId) {
        try {
            eventService.confirmEntryFee(eventId, teamId);
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }
        return true;
    }

    @PutMapping("createNew")
    public boolean createNew(@RequestBody Event event) {
        boolean respone = false;
        try {
            respone = eventService.createNew(event);
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }
        return respone;
    }

    @GetMapping("getEvent")
    public EventDTO getEvent(@RequestParam Long eventId) {
        try {
            return eventService.getEvent(eventId);
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }
        return null;
    }

    @PostMapping("deleteEvent")
    public Boolean deleteEvent(@RequestParam Long eventId) {
        try {
            return eventService.deleteEvent(eventId);
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }
        return false;
    }

    @PostMapping(value = "addEntryFeeFile")
    public boolean addEntryFeeFile(@RequestBody MultipartFile file,
                                   @RequestParam("eventId") Long eventId,
                                   @RequestParam("teamId") Long teamId) {
        try {
            return eventService.saveFile(file, eventId, teamId);
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }
        return false;
    }

    @GetMapping("/getEntryFeeFile")
    public ResponseEntity<byte[]> getEntryFeeFile(@RequestParam("eventId") Long eventId,
                                                  @RequestParam("teamId") Long teamId) {
        try {
            return eventService.getFile(eventId, teamId);
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }

        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/checkReferee")
    public boolean checkReferee(@RequestParam("eventId") Long eventId, Authentication auth) {
        return eventService.checkReferee(eventId, auth);
    }

    @GetMapping("/getRefereeOptions")
    public List<RefereeOption> getRefereeOptions() {
        return eventService.getRefereeOptions();
    }

    @GetMapping("/getEventClassesOptions")
    public List<ClassesOption> getEventClassesOptions() {
        return eventService.getEventClassesOptions();
    }

    @GetMapping("/sortByClass")
    public List<EventTeam> sortByClass(@RequestParam("eventId") Long eventId) {
        return eventService.sortByClass(eventId);
    }

    @PostMapping("/saveNumbersAndClasses")
    public boolean saveNumbersAndClasses(@RequestBody List<EventTeam> teams) {
        try {
            return eventService.saveNumbersAndClasses(teams);
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }

        return false;
    }
}
