package dev.jake.backend.service;

import dev.jake.backend.model.PodRacer;
import dev.jake.backend.model.dto.request.CreatePodRequest;
import dev.jake.backend.model.dto.request.UpdatePodRequest;
import dev.jake.backend.model.dto.response.PodRacerDto;
import dev.jake.backend.repo.PodRacerRepository;
import dev.jake.backend.service.exceptions.PodNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
class PodServiceTest {

    @Mock
    private PodRacerRepository podRacerRepository;

    @InjectMocks
    private PodService podService;

    private PodRacer mockPod;
    private List<PodRacer> mockList;

    private CreatePodRequest mockRequest;

    @BeforeEach
    void setup() {
        mockPod = new PodRacer();
        mockPod.setId(99L);
        mockPod.setName("racer-3");
        mockPod.setEngineCount(2);
        mockPod.setColor("#000");
        mockPod.setArmorRating(2);

        mockList = List.of(mockPod);

        mockRequest = new CreatePodRequest("racer-3", 2, "#000", 2);
    }

    @Test
    void createPod_shouldCallSaveOnRepoWithValidPod() throws Exception {

        when(podRacerRepository.save(any(PodRacer.class)))
                .thenReturn(mockPod);

        PodRacerDto result = podService.createPod(mockRequest);
        assertThat(result.id()).isEqualTo(99L);

        ArgumentCaptor<PodRacer> captor = ArgumentCaptor.forClass(PodRacer.class);
        verify(podRacerRepository).save(captor.capture());

        PodRacer savedPod = captor.getValue();
        assertThat(savedPod.getName()).isEqualTo("racer-3");
        assertThat(savedPod.getEngineCount()).isEqualTo(2);
        assertThat(savedPod.getColor()).isEqualTo("#000");
        assertThat(savedPod.getArmorRating()).isEqualTo(2);
        assertThat(savedPod.getValue()).isInstanceOf(Double.class);

    }

    @Test
    void getAllPods_shouldCallFindAllOnRepo() throws Exception {
        when(podRacerRepository.findAll()).thenReturn(mockList);

        List<PodRacerDto> result = podService.getAllPods();

        verify(podRacerRepository).findAll();
        assertThat(result).hasSize(1);

    }

    @Test
    void getPod_shouldReturnValidPodWhenIdExists() throws Exception {
        when(podRacerRepository.findById(any(Long.class)))
                .thenReturn(Optional.of(mockPod));

        PodRacerDto result = podService.getPod(mockPod.getId());
        assertThat(result.id()).isEqualTo(mockPod.getId());

        ArgumentCaptor<Long> captor = ArgumentCaptor.forClass(Long.class);
        verify(podRacerRepository).findById(captor.capture());

        assertThat(captor.getValue()).isEqualTo(mockPod.getId());

    }

    @Test
    void getPod_shouldThrowWhenPodInvalid() throws Exception {
        when(podRacerRepository.findById(any(Long.class)))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> podService.getPod(999L))
                .isInstanceOf(PodNotFoundException.class)
                .hasMessageContaining("Pod not found");

        verify(podRacerRepository).findById(eq(999L));
    }

    @Test
    void deletePod_shouldCallDeleteAndReturnVoid() throws Exception {
        doNothing().when(podRacerRepository).delete(any(PodRacer.class));
        when(podRacerRepository.findById(any(Long.class)))
                .thenReturn(Optional.of(mockPod));

        podService.deletePod(mockPod.getId());

        verify(podRacerRepository).delete(any(PodRacer.class));

    }

    @Test
    void deletePod_shouldThrowWhenPodNotFound() throws Exception {
        when(podRacerRepository.findById(any(Long.class)))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> podService.deletePod(999L))
                .isInstanceOf(PodNotFoundException.class)
                .hasMessageContaining("Pod not found");


        verify(podRacerRepository).findById(eq(999L));
        verify(podRacerRepository, never()).delete(any());
    }

    @Test
    void updatePod_shouldCallSaveWithCorrectObjectWhenUpdatingEngineCount() throws Exception {
        when(podRacerRepository.findById(any(Long.class)))
                .thenReturn(Optional.of(mockPod));

        PodRacer updatedPod = mockPod;
        updatedPod.setEngineCount(4);

        when(podRacerRepository.save(any(PodRacer.class)))
                .thenReturn(updatedPod);

        UpdatePodRequest mockRequest = new UpdatePodRequest(null, 4, null, null);

        PodRacerDto result = podService.updatePod(mockPod.getId(), mockRequest);
        assertThat(result.id()).isEqualTo(mockPod.getId());

        ArgumentCaptor<PodRacer> captor = ArgumentCaptor.forClass(PodRacer.class);
        verify(podRacerRepository).save(captor.capture());

        PodRacer pod = captor.getValue();
        assertThat(pod.getId()).isEqualTo(mockPod.getId());
        assertThat(pod.getName()).isEqualTo(mockPod.getName());
        assertThat(pod.getArmorRating()).isEqualTo(mockPod.getArmorRating());
        assertThat(pod.getEngineCount()).isEqualTo(4);
    }

}