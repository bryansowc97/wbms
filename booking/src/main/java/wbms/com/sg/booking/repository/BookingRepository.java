package wbms.com.sg.booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import wbms.com.sg.booking.entity.Booking;

import java.util.*;
import java.time.LocalDate;
import java.time.LocalDate;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
  @Query(value= "select b from Booking b")
  List<Booking> findAll();

  List<Booking> findByEmployeeId(String employeeId);

  Optional<Booking> findById(Long id);

  @Query(value = "select b from Booking b where rescId in :rescIdList and dteStart > sysDate and status = :status order by dteStart asc")
  public List<Booking> findAllByRescIdAndStatus(List<Long> rescIdList, String status);

  @Query(value = "select b from Booking b where rescId in :rescId and DATE(dteStart) = :dteStart and status = 'B'")
  List<Booking> findByRescId(Long rescId, LocalDate dteStart);
}
