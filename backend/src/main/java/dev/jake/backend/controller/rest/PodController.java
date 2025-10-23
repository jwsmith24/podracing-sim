package dev.jake.backend.controller.rest;

import dev.jake.backend.model.dto.request.CreatePodRequest;
import dev.jake.backend.model.dto.request.UpdatePodRequest;
import dev.jake.backend.model.dto.response.PodRacerDto;
import dev.jake.backend.service.PodService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

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

    @GetMapping()
    public ResponseEntity<List<PodRacerDto>> getPods() {
        log.info("user requested all pods");

        return ResponseEntity.ok(podService.getAllPods());
    }

    @GetMapping("/{podId}")
    public ResponseEntity<PodRacerDto> getPod(@PathVariable Long podId) {
        log.info("user requested pod with id={}", podId);

        return ResponseEntity.ok(podService.getPod(podId));

    }

    @DeleteMapping("/{podId}")
    public ResponseEntity<Void> deletePod(@PathVariable Long podId){
        log.info("deleting pod with id={}", podId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{podId}")
    public ResponseEntity<PodRacerDto> updatePod(@PathVariable Long podId,
                                                 @Valid @RequestBody UpdatePodRequest request) {
        log.info("Updating pod info");

        return ResponseEntity.ok(podService.updatePod(podId, request));



    }


}
