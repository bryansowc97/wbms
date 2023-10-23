package wbms.com.sg.workspace.service;

import wbms.com.sg.workspace.dto.BookingDTO;
import wbms.com.sg.workspace.entity.Workspace;

import java.util.List;
import java.util.Optional;

public interface WorkspaceService {

  public List<Workspace> findAll();
  public Optional<Workspace> findById(Long id);
  public List<Workspace> createUpdateWorkspace(List<Workspace> workspaceList);
  public void deleteWorkspaceById(List<Long> id);
  public List<Workspace> findByGpAndSubGp(String gp, String subgp);
  public List<Workspace> findByGp(String gp);
}
