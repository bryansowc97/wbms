package wbms.com.sg.accounts;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComUserRepository extends JpaRepository<ComUser, Long> {
  ComUser findByEmployeeId(String employeeId);
}
