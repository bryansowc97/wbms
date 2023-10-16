package wbms.com.sg.booking.dto;

public class ComUserDTO {

  private String employeeId;

  private String email;

  private Long contactNo;

  private String name;

  private Character role;

  private Character status;

  public String getEmployeeId() {
    return employeeId;
  }

  public void setEmployeeId(String employeeId) {
    this.employeeId = employeeId;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Long getContactNo() {
    return contactNo;
  }

  public void setContactNo(Long contactNo) {
    this.contactNo = contactNo;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Character getRole() {
    return role;
  }

  public void setRole(Character role) {
    this.role = role;
  }

  public Character getStatus() {
    return status;
  }

  public void setStatus(Character status) {
    this.status = status;
  }
}
