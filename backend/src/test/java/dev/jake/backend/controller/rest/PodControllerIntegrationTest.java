package dev.jake.backend.controller.rest;

import dev.jake.backend.model.dto.request.CreatePodRequest;
import dev.jake.backend.model.dto.response.PodRacerDto;
import dev.jake.backend.repo.PodRacerRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class PodControllerIntegrationTest {

    @Autowired
    TestRestTemplate restTemplate;

    @AfterEach
    void cleanup(@Autowired PodRacerRepository racerRepository) {
        racerRepository.deleteAll();

    }


    @Test
    void addNewPod_shouldReturnNewPodWithId() {

        CreatePodRequest request = new CreatePodRequest("test-racer99", 2, "#000000", 4);

        ResponseEntity<PodRacerDto> response = restTemplate.postForEntity("/api/garage", request,
                PodRacerDto.class);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(2, response.getBody().engineCount());
        assertEquals("#000000", response.getBody().color());
        assertEquals(4, response.getBody().armorRating());
        assertEquals("test-racer99", response.getBody().name());
    }

    @Test
    void getPodById_shouldReturnValidPod() {

        CreatePodRequest request = new CreatePodRequest("test-racer99", 2, "#000000", 4);

        ResponseEntity<PodRacerDto> getResponse = restTemplate.postForEntity("/api/garage", request,
                PodRacerDto.class);

        assertNotNull(getResponse.getBody());
        ResponseEntity<PodRacerDto> response =
                restTemplate.getForEntity("/api/garage/" + getResponse.getBody().id(),
                PodRacerDto.class);



        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(getResponse.getBody().id(), response.getBody().id());
        assertEquals("test-racer99", response.getBody().name());

    }



}
