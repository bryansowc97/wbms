package wbms.com.sg.workspace.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import wbms.com.sg.workspace.service.WorkspaceService;

@RestController
@CrossOrigin
@RequestMapping("/api/workspace")
public class WorkspaceResource {

  @Autowired
  WorkspaceService workspaceService;

  @GetMapping("/testWorkspaceDb")
  public ResponseEntity<?> testWorkspaceDb() {
    return new ResponseEntity<>(workspaceService.findAll(), HttpStatus.OK);
  }

  @GetMapping("/testBookingService")
  public ResponseEntity<?> testBookingService() {
    return new ResponseEntity<>(workspaceService.testBookingService(), HttpStatus.OK);
  }
}
