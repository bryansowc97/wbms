package wbms.com.sg.workspace.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import wbms.com.sg.workspace.entity.Workspace;
import wbms.com.sg.workspace.repository.WorkspaceRepository;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;


@ExtendWith(MockitoExtension.class)
class WorkspaceServiceTest {

    @Mock
    WorkspaceService workspaceService;

    @Mock
    WorkspaceRepository workspaceRepository;

    @BeforeEach
    void init(){
    }

    @Test
    void findAllWorkspace() {
        List<Workspace> workspace = List.of(new Workspace());
        Mockito.when(workspaceRepository.findAll()).thenReturn(workspace);
        List<Workspace> result = workspaceService.findAll();

        Assertions.assertEquals(workspace, result);
    }

    @Test
    void findSubGpsByGp() {
        Workspace workspace = new Workspace();

        Mockito.when(workspaceRepository.findSubGpsByGp("T")).thenReturn(List.of("A"));

        Assertions.assertEquals(List.of("A"), workspaceService.findSubGpsByGp("T"));
    }

    @Test
    void getWorkspaceById() {
        Workspace workspace = new Workspace();

        Mockito.when(workspaceRepository.findById(1L)).thenReturn(Optional.of(workspace));

        Assertions.assertEquals(Optional.of(workspace), workspaceService.findById(1L));
    }

    @Test
    void getWorkspaceByGpAndSubGp() {
        Workspace workspace = new Workspace();

        Mockito.when(workspaceRepository.findByGpAndSubGp("T", "A")).thenReturn(List.of(workspace));

        Assertions.assertEquals(List.of(workspace), workspaceService.findAll());
    }

    @Test
    void createWorkspace() {
        List<Workspace> workspace = Arrays.asList(new Workspace());

        workspaceService.createWorkspace(workspace);

        Mockito.verify(workspaceRepository, times(1)).saveAll(eq(workspace));
    }

    @Test
    void updateWorkspace() {
        List<Workspace> workspace = Arrays.asList(new Workspace());

        workspaceService.updateWorkspace(workspace);

        Mockito.verify(workspaceRepository, times(1)).saveAll(eq(workspace));
    }

    @Test
    void deleteWorkspaceById() {
        workspaceService.deleteWorkspaceById(List.of(1L));
        Mockito.verify(workspaceRepository, times(1)).deleteAllById(eq(List.of((1L))));
    }

}