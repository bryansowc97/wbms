package wbms.com.sg.booking.service;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import wbms.com.sg.booking.dto.BookingDTO;
import wbms.com.sg.booking.dto.ComUserDTO;
import wbms.com.sg.booking.entity.Booking;
import wbms.com.sg.booking.repository.BookingRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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

  // To be updated. Added to bypass error only
  @Override
  public Booking updateBookingByUser(BookingDTO bookingDTO) {
    return null;
  }

  @Override
  public void updateBooking(BookingDTO bookingDTO) {
    if (null == bookingDTO.getId()) {
      // test create new and save
      Booking toSave = new Booking();
      toSave.setEmployeeId("P1111111");
      toSave.setRescId(1L);
      toSave.setDteStart(LocalDateTime.of(2023, 10, 20, 12, 00, 00));
      toSave.setDteEnd(LocalDateTime.of(2023, 10, 20, 19, 00, 00));
      toSave.setStatus("B");
      bookingRepository.save(toSave);
    }
    else {
      Optional<Booking> existingBooking = bookingRepository.findById(bookingDTO.getId());
      if (existingBooking.isPresent()) {
        Booking entity = existingBooking.get();
        Booking incoming = dtoToEntity(bookingDTO);
        incoming.setId(entity.getId());
        bookingRepository.save(incoming);
      }
      else {
        throw new BadRequestException("Invalid Request");
      }
    }
  }

  public List<Booking> getBookingsByIds(List<Long> idList) {
    return bookingRepository.findAllByRescIdAndStatus(idList, "B");
  }

  public Booking dtoToEntity( BookingDTO dto) {
    Booking entity = new Booking();
    entity.setId(dto.getId());
    entity.setEmployeeId(dto.getEmployeeId());
    entity.setRescId(dto.getRescId());
    entity.setDteStart(dto.getDteStart());
    entity.setDteEnd(dto.getDteEnd());
    entity.setStatus(dto.getStatus());
    return entity;
  }

  public BookingDTO entityToDto( Booking entity) {
    BookingDTO dto = new BookingDTO();
    dto.setId(entity.getId());
    dto.setEmployeeId(entity.getEmployeeId());
    dto.setRescId(entity.getRescId());
    dto.setDteStart(entity.getDteStart());
    dto.setDteEnd(entity.getDteEnd());
    dto.setStatus(entity.getStatus());
    return dto;
  }


}
