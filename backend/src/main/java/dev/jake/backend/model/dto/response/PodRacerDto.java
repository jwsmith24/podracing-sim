package dev.jake.backend.model.dto.response;

public record PodRacerDto(
        Long id,
        String name,
        String color,
        Integer engineCount,
        Integer armorRating
) {
}
