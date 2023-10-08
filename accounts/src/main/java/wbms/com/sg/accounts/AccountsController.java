package wbms.com.sg.accounts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile")
public class AccountsController {
  @Autowired
  AccountService accountService;

  @GetMapping("/testDb")
  public ResponseEntity<?> testDb() {
//    uam checks
//    if ()
    return new ResponseEntity<>(accountService.testDb(), HttpStatus.OK);
  }

}
