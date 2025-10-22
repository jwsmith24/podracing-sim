package dev.jake.backend.service;

import dev.jake.backend.model.PodMapper;
import dev.jake.backend.model.PodRacer;
import dev.jake.backend.model.dto.request.CreatePodRequest;
import dev.jake.backend.model.dto.response.PodRacerDto;
import dev.jake.backend.repo.PodRacerRepository;
import org.springframework.stereotype.Service;

@Service
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

        PodRacer saved = podRacerRepository.save(pod);

         return PodMapper.toDto(saved);
    }
}
