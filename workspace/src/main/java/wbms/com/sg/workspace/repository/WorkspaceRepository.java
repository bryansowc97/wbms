package wbms.com.sg.workspace.repository;

import wbms.com.sg.workspace.entity.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {

  @Query(value ="select w from Workspace w")
  public List<Workspace> findAll();
}
