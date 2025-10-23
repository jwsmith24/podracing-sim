package dev.jake.backend.model.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public record UpdatePodRequest(
        String name,
        @Min(1) @Max(4) Integer engineCount,
        String color,
        @Min(0) @Max(5) Integer armorRating
) {
}
