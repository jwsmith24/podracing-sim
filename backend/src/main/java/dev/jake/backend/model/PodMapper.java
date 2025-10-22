package dev.jake.backend.model;

import dev.jake.backend.model.dto.response.PodRacerDto;

public class PodMapper {
    public static PodRacerDto toDto(PodRacer pod) {
        return new PodRacerDto(
                pod.getId(),
                pod.getName(),
                pod.getColor(),
                pod.getEngineCount(),
                pod.getArmorRating()
        );
    }
}
