package wbms.com.sg.accounts;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.springframework.data.annotation.Immutable;

import java.io.Serializable;

@Entity
@Immutable
@Table(name = "COM_USER")
public class ComUser implements Serializable {
    @Id
//    @Column(name = "EMPLOYEE_ID", length = 8)
    private String employeeId;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "CONTACT_NO")
    private Long contactNo;

    @Column(name = "NAME")
    private String name;

    @Column(name = "ROLE")
    private Character role;

    @Column(name = "STATUS")
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

    public String getPassword() {
      return password;
    }

    public void setPassword(String password) {
      this.password = password;
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
