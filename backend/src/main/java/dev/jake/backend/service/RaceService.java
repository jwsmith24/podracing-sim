package dev.jake.backend.service;

import dev.jake.backend.dto.ControlInput;
import dev.jake.backend.dto.PodState;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RaceService {

    private final int TRACK_PADDING = 10;
    private final int TRACK_LENGTH = 800;
    private final int TRACK_HEIGHT = 600;

    private final Map<String, PodState> pods = new ConcurrentHashMap<>();

    public Map<String, PodState> update(ControlInput input, double dt) {
        PodState pod = pods.computeIfAbsent(input.playerId(),
                id -> new PodState(id, 60d, 80d, 0d, 0d));

        double velocity = pod.velocity() + input.throttle() * 40 * dt;
        double angle = pod.angle() + input.steering() * 2 * dt;

        double x = pod.x() + velocity * Math.cos(pod.angle()) * dt;
        double y = pod.y() + velocity * Math.sin(pod.angle()) * dt;

        // track boundaries
        double minX = TRACK_PADDING, minY = TRACK_PADDING;
        double maxX = TRACK_LENGTH - TRACK_PADDING, maxY = TRACK_HEIGHT - TRACK_PADDING;

        // clamp position to track boundaries
        if (x < minX) {
            x = minX;
            velocity = 0;
        }
        if (x > maxX) {
            x = maxX;
            velocity = 0;
        }
        if (y < minY) {
            y = minY;
            velocity = 0;
        }
        if (y > maxY) {
            y = maxY;
            velocity = 0;
        }

        PodState updatedPod = new PodState(
                pod.playerId(),
                x,
                y,
                velocity,
                angle
        );

        pods.put(pod.playerId(), updatedPod);
        return pods;

    }

}
