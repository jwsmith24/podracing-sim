package dev.jake.backend.repo;

import dev.jake.backend.model.PodRacer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PodRacerRepository extends JpaRepository<PodRacer, Long> {
}
