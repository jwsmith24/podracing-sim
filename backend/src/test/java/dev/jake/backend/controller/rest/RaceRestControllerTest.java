package dev.jake.backend.controller.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.jake.backend.model.dto.ws.PodState;
import dev.jake.backend.service.RaceService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Map;

import static dev.jake.backend.util.TrackConstants.*;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RaceRestController.class)
class RaceRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;


    @MockitoBean
    private RaceService raceService;

    private PodState mockPod;

    @BeforeEach
    void setup() {
        mockPod = new PodState("test-player", STARTING_X_POSITION, STARTING_Y_POSITION,
                STARTING_VELOCITY, STARTING_ANGLE);
    }

    @Test
    void getAllPods_shouldReturnActivePodsAsJson() throws Exception {


        when(raceService.getPods()).thenReturn(Map.of("test-player", mockPod));

        mockMvc.perform(get("/api/race/pods"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$").isMap())
                .andExpect(jsonPath("$.player1.playerId").value("test-player"))
                .andExpect(jsonPath("$.player1.x").value(STARTING_X_POSITION))
                .andExpect(jsonPath("$.player1.y").value(STARTING_Y_POSITION))
                .andExpect(jsonPath("$.player1.velocity").value(STARTING_VELOCITY))
                .andExpect(jsonPath("$.player1.angle").value(STARTING_ANGLE));
    }

    @Test
    void getPodById_shouldReturnTargetPodAsJson() throws Exception {
        when(raceService.getPod(eq("test-player"))).thenReturn(mockPod);

        mockMvc.perform(get("/api/race/pods/test-player"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$.playerId").value("test-player"));
    }

    @Test
    void getPodById_shouldReturnErrorWhenNotFound() throws Exception {
        // todo
    }






}