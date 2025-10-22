package dev.jake.backend.controller.rest;

import dev.jake.backend.model.dto.request.CreatePodRequest;
import dev.jake.backend.model.dto.response.PodRacerDto;
import dev.jake.backend.service.PodService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/garage")
@Slf4j
public class PodController {

    private final PodService podService;

    public PodController(PodService podService) {
        this.podService = podService;
    }

    @PostMapping()
    public ResponseEntity<PodRacerDto> addNewPod(@Valid @RequestBody CreatePodRequest request) {
        PodRacerDto savedPod = podService.createPod(request);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedPod.id())
                .toUri();

        log.info("created new pod with id={} at {}", savedPod.id(), location);

        return ResponseEntity.created(location).body(savedPod);
    }


}
