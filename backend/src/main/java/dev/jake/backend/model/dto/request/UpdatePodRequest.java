package dev.jake.backend.model.dto.request;

public record UpdatePodRequest(
        String name,
        Integer engineCount,
        String color,
        Integer armorRating
) {
}
