package wbms.com.sg.booking.entity;

import jakarta.persistence.*;

import java.io.Serializable;
import java.time.LocalDateTime;
@Entity
@Table(name = "booking")
public class Booking implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "employee_id")
  private String employeeId;

  @Column(name ="resc_id")
  private Long rescId;

  @Column(name = "dte_start")
  private LocalDateTime dteStart;

  @Column(name = "dte_end")
  private LocalDateTime dteEnd;

  @Column(name = "status")
  private String status;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getEmployeeId() {
    return employeeId;
  }

  public void setEmployeeId(String employeeId) {
    this.employeeId = employeeId;
  }

  public Long getRescId() {
    return rescId;
  }

  public void setRescId(Long rescId) {
    this.rescId = rescId;
  }

  public LocalDateTime getDteStart() {
    return dteStart;
  }

  public void setDteStart(LocalDateTime dteStart) {
    this.dteStart = dteStart;
  }

  public LocalDateTime getDteEnd() {
    return dteEnd;
  }

  public void setDteEnd(LocalDateTime dteEnd) {
    this.dteEnd = dteEnd;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }
}
