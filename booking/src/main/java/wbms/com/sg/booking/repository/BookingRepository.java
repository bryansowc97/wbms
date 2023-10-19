package wbms.com.sg.booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import wbms.com.sg.booking.entity.Booking;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
  @Query(value= "select b from Booking b")
  List<Booking> findAll();

  List<Booking> findByEmployeeId(String employeeId);
}
