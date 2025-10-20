package dev.jake.backend.dto;

public record ControlInput(
        String playerId,
        Double throttle,
        Double steering
) {
}
