package dev.jake.backend.model;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class PodRacer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String color;

    private Integer engineCount;

    private Integer armorRating;

    private Double value = 100.00;

    @CreationTimestamp
    @Column(updatable = false, nullable = false)
    private Instant createdOn;

    @UpdateTimestamp
    @Column(nullable = false)
    private Instant updatedOn;
}
