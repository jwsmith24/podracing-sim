package dev.jake.backend.service;

import dev.jake.backend.model.PodMapper;
import dev.jake.backend.model.PodRacer;
import dev.jake.backend.model.dto.request.CreatePodRequest;
import dev.jake.backend.model.dto.request.UpdatePodRequest;
import dev.jake.backend.model.dto.response.PodRacerDto;
import dev.jake.backend.repo.PodRacerRepository;
import dev.jake.backend.service.exceptions.PodNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@Transactional
public class PodService {

    private final PodRacerRepository podRacerRepository;

    public PodService(PodRacerRepository podRacerRepository) {
        this.podRacerRepository = podRacerRepository;
    }


    public PodRacerDto createPod(CreatePodRequest request) {
        PodRacer pod = new PodRacer();
        pod.setName(request.name());
        pod.setColor(request.color());
        pod.setEngineCount(request.engineCount());
        pod.setArmorRating(request.armorRating());
        pod.setValue(generateRandomValue());

        PodRacer saved = podRacerRepository.save(pod);

        return PodMapper.toDto(saved);
    }

    private double generateRandomValue() {
        double value = Math.random() * 100;
        return  BigDecimal.valueOf(value)
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue();
    }

    public List<PodRacerDto> getAllPods() {
        List<PodRacer> pods = podRacerRepository.findAll();

        return pods.stream()
                .map(PodMapper::toDto)
                .toList();
    }

    public PodRacerDto getPod(Long podId) {
        PodRacer pod =
                podRacerRepository.findById(podId).orElseThrow(() -> new PodNotFoundException(podId));

        return PodMapper.toDto(pod);

    }

    public void deletePod(Long podId) {

        PodRacer target =
                podRacerRepository.findById(podId).orElseThrow(() -> new PodNotFoundException(podId));

        podRacerRepository.delete(target);
    }

    public PodRacerDto updatePod(Long podId, UpdatePodRequest request) {
        PodRacer pod =
                podRacerRepository.findById(podId).orElseThrow(() -> new PodNotFoundException(podId));

        if (request.name() != null) {
            pod.setName(request.name());
        }

        if (request.engineCount() != null) {
            pod.setEngineCount(request.engineCount());
        }

        if (request.armorRating() != null) {
            pod.setArmorRating(request.armorRating());
        }

        if (request.color() != null) {
            pod.setColor(request.color());
        }

        PodRacer saved = podRacerRepository.save(pod);
        return PodMapper.toDto(saved);
    }
}
