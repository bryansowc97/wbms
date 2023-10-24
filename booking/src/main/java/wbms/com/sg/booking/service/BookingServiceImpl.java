package wbms.com.sg.booking.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import wbms.com.sg.booking.dto.BookingDTO;
import wbms.com.sg.booking.dto.ComUserDTO;
import wbms.com.sg.booking.entity.Booking;
import wbms.com.sg.booking.repository.BookingRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class BookingServiceImpl implements BookingService{

  @Autowired
  private BookingRepository bookingRepository;

  public ComUserDTO getUserFromAccountsService() {

    String targetUrl = "http://localhost:8080/api/profile/testDb";

    RestTemplate restTemplate = new RestTemplate();

    return restTemplate.getForObject(targetUrl, ComUserDTO.class);
  }
  public List<Booking> findAll() {

    return bookingRepository.findAll();
  }

  public List<Booking> getBookingsByUser(String employeeId) {
    return bookingRepository.findByEmployeeId(employeeId);
  }

  @Override
  public Booking updateBookingByUser(BookingDTO bookingDTO) {
    // test create new and save
    Booking toSave = new Booking();
    toSave.setEmployeeId("P1111111");
    toSave.setRescId(1L);
    toSave.setDteStart(LocalDateTime.of(2023, 10, 20, 12, 00, 00));
    toSave.setDteEnd(LocalDateTime.of(2023, 10, 20, 19, 00, 00));
    toSave.setStatus("B");
    bookingRepository.save(toSave);
    return new Booking();
  }
}
