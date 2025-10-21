package dev.jake.backend.controller;

import dev.jake.backend.dto.ControlInput;
import dev.jake.backend.dto.PodState;
import dev.jake.backend.service.RaceService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
public class RaceController {

    private final RaceService raceService;
    private final SimpMessagingTemplate messagingTemplate;

    public RaceController (RaceService raceService, SimpMessagingTemplate messagingTemplate) {
        this.raceService = raceService;
        this.messagingTemplate = messagingTemplate;
    }

    // receive player control inputs over /app/race/control
    // broadcast updated race state to /topic/race/global

    @MessageMapping("/race/control")
    public void receiveControl(ControlInput input) {

        double dt = 0.016;

        // update pod states
        Map<String, PodState> updatedPods = raceService.update(input, dt);

        // broadcast new positions to all subscribers
        messagingTemplate.convertAndSend("/topic/race/global", updatedPods);

    }
}
