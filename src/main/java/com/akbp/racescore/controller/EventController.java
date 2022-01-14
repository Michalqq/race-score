package com.akbp.racescore.controller;

import com.akbp.racescore.model.dto.ClassesOption;
import com.akbp.racescore.model.dto.EventDTO;
import com.akbp.racescore.model.dto.PsOption;
import com.akbp.racescore.model.dto.StgesAndClassesDTO;
import com.akbp.racescore.model.entity.Event;
import com.akbp.racescore.model.entity.EventTeam;
import com.akbp.racescore.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/event", method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin("*")
public class EventController {

    private static final String GENERAL = "GENERALNA";

    private final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/getAll")
    public List<EventDTO> getAll() {
        return eventService.getAll();
    }

    @PostMapping("/startEvent")
    public boolean startEvent(@RequestParam("eventId") Long eventId) {
        return eventService.startEvent(eventId);
    }

    @GetMapping("/getStages")
    public List<String> getStages(@RequestParam("eventId") Long eventId) {
        List<String> stages = eventService.getStages(eventId);
        return stages;
    }

    @GetMapping("/getTeams")
    public List<EventTeam> getTeams(@RequestParam("eventId") Long eventId) {
        return eventService.getTeams(eventId);
    }

    @GetMapping("/getPsOptions")
    public List<PsOption> getPsOptions(@RequestParam("eventId") Long eventId) {
        return eventService.getPsOptions(eventId);
    }

    @GetMapping("/getStagesAndClasses")
    public StgesAndClassesDTO getStagesAndClasses(@RequestParam("eventId") Long eventId) {
        List<PsOption> psOptions = eventService.getPsOptions(eventId);
        List<ClassesOption> classes = eventService.getClasses(eventId);
        StgesAndClassesDTO sacDTO = new StgesAndClassesDTO(psOptions, classes);
        return sacDTO;
    }

    @PostMapping("removeTeam")
    public boolean removeTeam(@RequestParam("eventId") Long eventId, @RequestParam("teamId") Long teamId) {
        eventService.removeTeam(eventId, teamId);
        return true;
    }

    @PostMapping("confirmEntryFee")
    public boolean confirmEntryFee(@RequestParam("eventId") Long eventId, @RequestParam("teamId") Long teamId) {
        eventService.confirmEntryFee(eventId, teamId);
        return true;
    }

    @PutMapping("createNew")
    public boolean createNew(@RequestBody Event event) {
        eventService.createNew(event);
        return true;
    }

    @GetMapping("/checkReferee")
    public boolean checkReferee(@RequestParam("eventId") Long eventId, Authentication auth) {
        return eventService.checkReferee(eventId, auth);
    }
}
