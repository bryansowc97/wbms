package wbms.com.sg.workspace.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
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

  @GetMapping("/findByGp/{gp}")
  public ResponseEntity<?> findByGp(@PathVariable String gp) {
    return new ResponseEntity<>(workspaceService.findByGp(gp), HttpStatus.OK);
  }

  @GetMapping("/getWorkspaceByGpAndSubGp/{id}")
  public ResponseEntity<?> getWorkspaceById(@PathVariable Long id) {
    return new ResponseEntity<>(workspaceService.findById(id), HttpStatus.OK);
  }

  @GetMapping("/getWorkspaceByGpAndSubGp/{gp}/{subgp}")
  public ResponseEntity<?> getWorkspaceById(@PathVariable String gp, @PathVariable String subgp) {
    return new ResponseEntity<>(workspaceService.findByGpAndSubGp(gp, subgp), HttpStatus.OK);
  }

  @PostMapping("/createUpdateWorkspace")
  public ResponseEntity<?> createUpdateWorkspace(
    @RequestBody List<Workspace> workspaceList
  ) {
    return new ResponseEntity<>(workspaceService.createUpdateWorkspace(workspaceList), HttpStatus.OK);
  }

  @DeleteMapping("/deleteWorkspaceById")
  public ResponseEntity<?> deleteWorkspaceById(@RequestBody List<Long> id) {
    workspaceService.deleteWorkspaceById(id);
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
