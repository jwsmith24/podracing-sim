package dev.jake.backend.service;

import dev.jake.backend.model.dto.ws.ControlInput;
import dev.jake.backend.model.dto.ws.PodState;
import dev.jake.backend.service.exceptions.PodNotFoundException;
import lombok.Getter;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import static dev.jake.backend.util.TrackConstants.*;

@Service
@Getter
public class RaceService {

    private final Map<String, PodState> pods = new ConcurrentHashMap<>();

    public Map<String, PodState> update(ControlInput input, double dt) {
        PodState pod = pods.computeIfAbsent(input.playerId(),
                id -> new PodState(id, STARTING_X_POSITION, STARTING_Y_POSITION,
                        STARTING_VELOCITY, STARTING_ANGLE));

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

    public void clearPods() {
        pods.clear();
    }

    public PodState getPod(String racerId) {
        PodState result = pods.get(racerId);

        if (result == null) throw new PodNotFoundException(racerId);

        return result;
    }

}
