package dev.jake.backend.controller.rest;

import dev.jake.backend.model.dto.ws.PodState;
import dev.jake.backend.service.RaceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/race")
public class RaceRestController {

    private final RaceService raceService;

    public RaceRestController(RaceService raceService) {
        this.raceService = raceService;
    }

    @GetMapping("/pods")
    public ResponseEntity<Map<String, PodState>> getAllPods() {
        Map<String, PodState> result = raceService.getPods();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/pods/{racerId}")
    public ResponseEntity<PodState> getPodById(@PathVariable String racerId) {
        PodState pod = raceService.getPod(racerId);

        return ResponseEntity.ok(pod);
    }
}
