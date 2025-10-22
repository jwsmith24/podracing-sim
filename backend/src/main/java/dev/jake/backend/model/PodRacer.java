package dev.jake.backend.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PodRacer {

    private Long id;

    private String name;

    private String color;

    private Integer engineCount;

    private Integer armorRating;
}
