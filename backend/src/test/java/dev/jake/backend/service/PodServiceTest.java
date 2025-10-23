package dev.jake.backend.service;

import dev.jake.backend.repo.PodRacerRepository;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.bean.override.mockito.MockitoBean;


//todo:
@ExtendWith(MockitoExtension.class)
class PodServiceTest {

    @MockitoBean
    private PodRacerRepository podRacerRepository;

    @InjectMocks
    private PodService podService;

}