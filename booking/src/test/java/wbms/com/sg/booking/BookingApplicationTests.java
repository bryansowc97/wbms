package wbms.com.sg.booking;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import wbms.com.sg.booking.dto.BookingDTO;
import wbms.com.sg.booking.entity.Booking;
import wbms.com.sg.booking.repository.BookingRepository;
import wbms.com.sg.booking.service.BookingService;
import wbms.com.sg.booking.service.BookingServiceImpl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;

class BookingApplicationTests {

  @InjectMocks
  BookingServiceImpl bookingService;

  @Mock
  BookingRepository bookingRepository;

  @BeforeEach
  void init(){
    MockitoAnnotations.openMocks(this);
  }

	@Test
	void findById() {
    Booking booking = new Booking();

    Mockito.when(bookingRepository.findById(1L)).thenReturn(Optional.of(booking));

    Assertions.assertEquals(booking, bookingService.findById(1L));
	}

  @Test
  void findAll() {
    Booking booking = new Booking();

    Mockito.when(bookingRepository.findAll()).thenReturn(List.of(booking));

    Assertions.assertEquals(List.of(booking), bookingService.findAll());
  }

  @Test
  void getBookingsByUser() {
    String employeeId = "p1111111";
    Booking booking = new Booking();

    Mockito.when(bookingRepository.findByEmployeeId(employeeId)).thenReturn(List.of(booking));

    Assertions.assertEquals(List.of(booking), bookingService.getBookingsByUser(employeeId));
  }

  @Test
  void findByRescId() {
    Long rescId = 1L;
    LocalDate date = LocalDate.now();
    Booking booking = new Booking();

    Mockito.when(bookingRepository.findByRescId(rescId, date)).thenReturn(List.of(booking));

    Assertions.assertEquals(List.of(booking), bookingService.findByRescId(rescId, date));
  }

  @Test
  void updateBooking() {
    BookingDTO bookingDTO = new BookingDTO();

    bookingService.updateBooking(bookingDTO);

    Mockito.verify(bookingRepository, times(1)).save(any());
  }
}
