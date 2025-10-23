package dev.jake.backend.service.exceptions;

public class PodNotFoundException extends RuntimeException {
    public PodNotFoundException(String racerId) {
        super(String.format("Pod not found with id: %s", racerId));
    }
    public PodNotFoundException(Long podId) {
        super(String.format("Pod not found with id: %s", podId));
    }
}
