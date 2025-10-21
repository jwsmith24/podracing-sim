package dev.jake.backend.service.exceptions;

public class PodNotFoundException extends RuntimeException {
  public PodNotFoundException(String message) {
    super(message);
  }
}
