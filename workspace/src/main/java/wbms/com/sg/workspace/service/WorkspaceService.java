package wbms.com.sg.workspace.service;

import wbms.com.sg.workspace.entity.Workspace;

import java.util.*;
import java.util.Optional;

public interface WorkspaceService {

  public List<Workspace> findAll();
  public Workspace findById(Long id);
  public List<Workspace> createWorkspace(List<Workspace> workspaceList);
  public List<Workspace> updateWorkspace(List<Workspace> workspaceList);
  public void deleteWorkspaceById(List<Long> id);
  public List<Workspace> findByGpAndSubGp(String gp, String subgp);
  public List<String> findSubGpsByGp(String gp);
}
