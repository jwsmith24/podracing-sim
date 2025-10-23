package dev.jake.backend.model.dto.response;

import java.time.LocalDateTime;
import java.util.Map;

public record ErrorResponseDto(
        LocalDateTime timeStamp,
        int status,
        String error,
        Map<String, String> details
) {
}
