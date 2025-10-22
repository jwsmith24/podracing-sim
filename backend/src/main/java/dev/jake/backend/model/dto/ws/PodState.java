package dev.jake.backend.model.dto.ws;

public record PodState(
        String playerId,
        Double x,
        Double y,
        Double velocity,
        Double angle
) {
}
