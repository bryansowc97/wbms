package wbms.com.sg.workspace.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import wbms.com.sg.workspace.dto.UpdateWorkspaceDTO;
import wbms.com.sg.workspace.entity.Workspace;
import wbms.com.sg.workspace.service.WorkspaceService;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/workspace")
public class WorkspaceResource {

  @Autowired
  WorkspaceService workspaceService;

  @GetMapping("/findAllWorkspace")
  public ResponseEntity<?> findAllWorkspace() {
    return new ResponseEntity<>(workspaceService.findAll(), HttpStatus.OK);
  }

  @GetMapping("/findSubGpsByGp/{gp}")
  public ResponseEntity<?> findSubGpsByGp(@PathVariable String gp) {
    return new ResponseEntity<>(workspaceService.findSubGpsByGp(gp), HttpStatus.OK);
  }

  @GetMapping("/getWorkspaceById/{id}")
  public ResponseEntity<?> getWorkspaceById(@PathVariable Long id) {
    return new ResponseEntity<>(workspaceService.findById(id), HttpStatus.OK);
  }

  @GetMapping("/getWorkspaceByGpAndSubGp/{gp}/{subgp}")
  public ResponseEntity<?> getWorkspaceById(@PathVariable String gp, @PathVariable String subgp) {
    return new ResponseEntity<>(workspaceService.findByGpAndSubGp(gp, subgp), HttpStatus.OK);
  }

  @PostMapping("/createWorkspace")
  public ResponseEntity<?> createWorkspace(
    @RequestBody List<Workspace> workspaceList
  ) {
    try {
      return new ResponseEntity<>(workspaceService.createWorkspace(workspaceList), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
  }

  @PostMapping("/updateWorkspace")
  public ResponseEntity<?> updateWorkspace(
    @RequestBody UpdateWorkspaceDTO updateWorkspaceDTO
  ) {
    try {
      workspaceService.deleteWorkspaceById(updateWorkspaceDTO.getIdListToDelete());
      return new ResponseEntity<>(workspaceService.updateWorkspace(updateWorkspaceDTO.getUpdateList()), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
  }

  @DeleteMapping("/deleteWorkspaceById")
  public ResponseEntity<?> deleteWorkspaceById(@RequestBody List<Long> id) {
    try {
      workspaceService.deleteWorkspaceById(id);
      return new ResponseEntity<>(HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
  }
}
