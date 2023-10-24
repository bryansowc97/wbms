package wbms.com.sg.booking.service;

import wbms.com.sg.booking.dto.BookingDTO;
import wbms.com.sg.booking.dto.ComUserDTO;
import wbms.com.sg.booking.entity.Booking;

import java.util.*;

public interface BookingService {

  ComUserDTO getUserFromAccountsService();

  List<Booking> findAll();

  List<Booking> getBookingsByUser(String employeeId);

  Booking findById(Long id);
  void updateBooking(BookingDTO bookingDTO);
}
