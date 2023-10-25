package wbms.com.sg.booking.service;

import wbms.com.sg.booking.dto.BookingDTO;
import wbms.com.sg.booking.dto.ComUserDTO;
import wbms.com.sg.booking.entity.Booking;

import java.util.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
public interface BookingService {

  ComUserDTO getUserFromAccountsService();

  List<Booking> findAll();

  List<Booking> getBookingsByUser(String employeeId);

  Booking findById(Long id);
  // Booking updateBookingByUser(BookingDTO bookingDTO);

  List<Booking> getBookingsByIds(List<Long> idList);

  void updateBooking(BookingDTO bookingDTO);

  List<Booking> findByRescId(Long rescId, LocalDate date);

}
