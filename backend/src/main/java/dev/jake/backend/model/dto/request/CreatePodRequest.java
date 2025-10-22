package dev.jake.backend.model.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record CreatePodRequest(
        @NotEmpty String name,
        @NotNull @Min(1) @Max(4) Integer engineCount,
        @NotEmpty String color,
        @NotNull @Min(1) @Max(5) Integer armorRating
) {
}
