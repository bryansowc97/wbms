package wbms.com.sg.booking.dto;

import java.time.LocalDateTime;

public class BookingDTO {

  private Long id;

  private String employeeId;

  private Long rescId;

  private LocalDateTime dteStart;

  private LocalDateTime dteEnd;

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
