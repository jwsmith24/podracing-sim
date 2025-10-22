package dev.jake.backend.service;

import dev.jake.backend.model.dto.ws.ControlInput;
import dev.jake.backend.model.dto.ws.PodState;
import dev.jake.backend.service.exceptions.PodNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Map;

import static dev.jake.backend.util.TrackConstants.*;
import static org.junit.jupiter.api.Assertions.*;

class RaceServiceTest {

    private final Double FRAME_RATE_60_HZ = 0.016; // 1/60

    private RaceService raceService;

    @BeforeEach
    void setup() {
        raceService = new RaceService();
    }

    @Test
    void update_shouldAddNewPodIfKeyNotPresent() {
       ControlInput input = new ControlInput("test-player", 1.0, 0.0);

       Map<String, PodState> result = raceService.update(input, FRAME_RATE_60_HZ);

       assertTrue(result.containsKey("test-player"));
       PodState pod = result.get("test-player");
       assertNotNull(pod);
       assertEquals("test-player", pod.playerId());

    }


    @Test
    void update_shouldStopPodAtTrackBoundary() {
        ControlInput input = new ControlInput("edge-player", 1.0, 0.0);

        // simulate updates moving towards the edge
        for (int i = 0; i < 500; i++) {
            raceService.update(input, FRAME_RATE_60_HZ);
        }

        PodState pod = raceService.getPods().get("edge-player");

        // make sure pod is clamped near the boundary and velocity is 0
        assertEquals((TRACK_LENGTH - TRACK_PADDING), Math.round(pod.x()), "Pod should be clamped " +
                "at" +
                " the track boundary");

        assertEquals(0, Math.round(pod.velocity()), "Velocity should be reset to 0 on crash with " +
                "boundary");
    }


    @Test
    void clearPods_shouldResetTheMap() {

        raceService.update(new ControlInput("test-1", 1.0, 0.0), FRAME_RATE_60_HZ);
        raceService.update(new ControlInput("test-2", 1.0, 0.0), FRAME_RATE_60_HZ);
        assertFalse(raceService.getPods().isEmpty());

        raceService.clearPods();

        assertTrue(raceService.getPods().isEmpty(), "Pods map should be empty after a clear");

    }

    @Test
    void getPod_shouldReturnValidPod() {
        raceService.update(new ControlInput("test-1", 1.0, 0.0), FRAME_RATE_60_HZ);
        raceService.update(new ControlInput("test-2", 1.0, 0.0), FRAME_RATE_60_HZ);
        assertFalse(raceService.getPods().isEmpty());

        assertNotNull(raceService.getPod("test-2"));
    }

    @Test
    void getPod_shouldThrowIfNotFound() {
        assertThrows(PodNotFoundException.class, () -> raceService.getPod("does not exist"));
    }

}