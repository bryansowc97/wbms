package wbms.com.sg.booking.resource;

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
import wbms.com.sg.booking.service.BookingService;

@RestController
@CrossOrigin
@RequestMapping("/api/booking")
public class BookingResource {

  @Autowired
  BookingService bookingService;

  @GetMapping("/findAll")
  public ResponseEntity<?> testBookingDb(){
    return new ResponseEntity<>(bookingService.findAll(), HttpStatus.OK);
  }

//  @GetMapping("/getBookingsByUser")
//  public ResponseEntity<?> getBookingsByUser(String employeeId) {
//    return new ResponseEntity<>(bookingService.getBookingsByUser(employeeId), HttpStatus.OK);
//  }

  @GetMapping("/getBookingsByUser/{employeeId}")
  public ResponseEntity<?> getBookingsByUser(@PathVariable String employeeId) {
    return new ResponseEntity<>(bookingService.getBookingsByUser(employeeId), HttpStatus.OK);
  }
}
