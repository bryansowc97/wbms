package wbms.com.sg.booking.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wbms.com.sg.booking.dto.BookingDTO;
import wbms.com.sg.booking.dto.ComUserDTO;
import wbms.com.sg.booking.service.BookingService;

import java.util.List;

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

  @PostMapping("/updateBooking/")
  public ResponseEntity<?> getBookingsByUser(@RequestBody BookingDTO bookingDTO) {
    return new ResponseEntity<>(bookingService.updateBookingByUser(bookingDTO), HttpStatus.OK);
  }

  @PostMapping("/getBookingsByIds")
  public ResponseEntity<?> getBookingsByIds(@RequestBody List<Long> idList) {
    return new ResponseEntity<>(bookingService.getBookingsByIds(idList), HttpStatus.OK);
  }
}
