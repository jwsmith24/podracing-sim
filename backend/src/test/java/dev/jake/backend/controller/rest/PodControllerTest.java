package dev.jake.backend.controller.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.jake.backend.model.PodRacer;
import dev.jake.backend.model.dto.request.CreatePodRequest;
import dev.jake.backend.model.dto.request.UpdatePodRequest;
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

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
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

    private List<PodRacerDto> mockPodList;

    @BeforeEach
    void setup() {
        mockPod = new PodRacerDto(1L, "racer-1", "#000000", 2, 1, 100.00);

        mockPodList = List.of(mockPod,
                new PodRacerDto(2L, "racer-2", "#ffffff", 4, 3, 100.00));
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
                .andExpect(jsonPath("$.armorRating").value(1))
                        .andExpect(jsonPath("$.value").value(100.00));


        verify(podService).createPod(any(CreatePodRequest.class));
    }

    @Test
    void getPods_shouldReturnAllPods() throws Exception {

        when(podService.getAllPods()).thenReturn(mockPodList);

        mockMvc.perform(get("/api/garage"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(2));


        verify(podService).getAllPods();
    }

    @Test
    void getPod_shouldReturnPodAsJson() throws Exception {
        when(podService.getPod(any(Long.class)))
                .thenReturn(mockPod);

        mockMvc.perform(get("/api/garage/{id}", mockPod.id()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("racer-1"))
                .andExpect(jsonPath("$.color").value("#000000"))
                .andExpect(jsonPath("$.engineCount").value(2))
                .andExpect(jsonPath("$.armorRating").value(1));
    }

    @Test
    void deletePod_shouldReturnNoContent() throws Exception {
        doNothing().when(podService).deletePod(any(Long.class));

        mockMvc.perform(delete("/api/garage/{id}", mockPod.id()))
                .andExpect(status().isNoContent());
    }

    @Test
    void updatePod_ShouldOnlyUpdateEngineCount() throws Exception {
        PodRacerDto updatedEnginePod = new PodRacerDto(mockPod.id(), mockPod.name(),
                mockPod.color(), 4, mockPod.armorRating(), mockPod.value());

        when(podService.updatePod(any(Long.class), any(UpdatePodRequest.class)))
                .thenReturn(updatedEnginePod);

        UpdatePodRequest request = new UpdatePodRequest(null, 4, null, null);

        mockMvc.perform(patch("/api/garage/{podId}", mockPod.id())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("racer-1"))
                .andExpect(jsonPath("$.color").value("#000000"))
                .andExpect(jsonPath("$.engineCount").value(4))
                .andExpect(jsonPath("$.armorRating").value(1));
    }



}