package dev.jake.backend.model.dto.ws;

public record ControlInput(
        String playerId,
        Double throttle,
        Double steering
) {
}
