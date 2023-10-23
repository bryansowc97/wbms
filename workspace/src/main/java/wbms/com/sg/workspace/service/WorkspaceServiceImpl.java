package wbms.com.sg.workspace.service;

import wbms.com.sg.workspace.common.IConstants;
import wbms.com.sg.workspace.dto.BookingDTO;
import wbms.com.sg.workspace.entity.Workspace;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import wbms.com.sg.workspace.repository.WorkspaceRepository;

import java.util.*;

@Service
@Transactional
public class WorkspaceServiceImpl implements WorkspaceService{

  @Autowired
  private RestTemplate restTemplate;

  @Autowired
  private WorkspaceRepository workspaceRepository;

  public List<Workspace> findByGp(String gp) {
    return workspaceRepository.findByGp(gp);
  }

  public List<Workspace> findAll() {
    return workspaceRepository.findAll();
  }

  public Optional<Workspace> findById(Long id) {
    return workspaceRepository.findById(id);
  }

  public List<Workspace> createUpdateWorkspace(List<Workspace> workspaceList) {
    return workspaceRepository.saveAll(workspaceList);
  }

  public void deleteWorkspaceById(List<Long> id) {
      workspaceRepository.deleteAllById(id);
  }

  public List<Workspace> findByGpAndSubGp(String gp, String subgp) {
    return workspaceRepository.findByGpAndSubGp(gp, subgp);
  }
}
