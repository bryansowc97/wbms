package wbms.com.sg.workspace.service;

import wbms.com.sg.workspace.entity.Workspace;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wbms.com.sg.workspace.repository.WorkspaceRepository;

import java.util.*;

@Service
@Transactional
public class WorkspaceServiceImpl implements WorkspaceService{

  @Autowired
  private WorkspaceRepository workspaceRepository;

  public List<String> findSubGpsByGp(String gp) {
    return workspaceRepository.findSubGpsByGp(gp);
  }

  public List<Workspace> findAll() {
    return workspaceRepository.findAll();
  }

  public Optional<Workspace> findById(Long id) {
    return workspaceRepository.findById(id);
  }

  public List<Workspace> createWorkspace(List<Workspace> workspaceList) {
    return workspaceRepository.saveAll(workspaceList);
  }

  public List<Workspace> updateWorkspace(List<Workspace> workspaceList) {
    // check if got booking
    return workspaceRepository.saveAll(workspaceList);
  }

  public void deleteWorkspaceById(List<Long> id) {
    // check if got booking
    workspaceRepository.deleteAllById(id);
  }

  public List<Workspace> findByGpAndSubGp(String gp, String subgp) {
    return workspaceRepository.findByGpAndSubGp(gp, subgp);
  }
}
