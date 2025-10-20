package dev.jake.backend.dto;

public record PodState(
        String playerId,
        Double x,
        Double y,
        Double velocity,
        Double angle
) {
}
