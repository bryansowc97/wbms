package wbms.com.sg.workspace.dto;

import wbms.com.sg.workspace.entity.Workspace;

import java.util.List;

public class UpdateWorkspaceDTO {

  private List<Long> idListToDelete;
  private List<Workspace> updateList;

  public List<Long> getIdListToDelete() {
    return idListToDelete;
  }

  public void setIdListToDelete(List<Long> idListToDelete) {
    this.idListToDelete = idListToDelete;
  }

  public List<Workspace> getUpdateList() {
    return updateList;
  }

  public void setUpdateList(List<Workspace> updateList) {
    this.updateList = updateList;
  }
}
