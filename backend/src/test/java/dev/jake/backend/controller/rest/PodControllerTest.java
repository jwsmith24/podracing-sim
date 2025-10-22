package dev.jake.backend.controller.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.jake.backend.model.PodRacer;
import dev.jake.backend.model.dto.request.CreatePodRequest;
import dev.jake.backend.model.dto.response.PodRacerDto;
import dev.jake.backend.service.PodService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PodController.class)
class PodControllerTest {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private PodService podService;

    private PodRacerDto mockPod;

    @BeforeEach
    void setup() {
        mockPod = new PodRacerDto(1L, "racer-1", "#000000", 2, 1);
    }

    @Test
    void createPod_shouldReturnJsonOfNewPod() throws Exception{

        when(podService.createPod(any(CreatePodRequest.class))).thenReturn(mockPod);

        CreatePodRequest mockRequest = new CreatePodRequest("racer-1", 2, "#000000", 1);

        mockMvc.perform(post("/api/garage")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(mockRequest)))
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", "http://localhost/api/garage/1"))
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("racer-1"))
                .andExpect(jsonPath("$.color").value("#000000"))
                .andExpect(jsonPath("$.engineCount").value(2))
                .andExpect(jsonPath("$.armorRating").value(1));


    }


}