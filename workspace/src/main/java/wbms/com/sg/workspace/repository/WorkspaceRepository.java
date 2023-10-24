package wbms.com.sg.workspace.repository;

import wbms.com.sg.workspace.entity.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {

  @Query(value = "select w from Workspace w where gp = :gp and subGp = :subGp")
  public List<Workspace> findByGpAndSubGp(String gp, String subGp);

  @Query(value = "select distinct(w.subGp) from Workspace w where gp = :gp")
  public List<String> findSubGpsByGp(String gp);
}
