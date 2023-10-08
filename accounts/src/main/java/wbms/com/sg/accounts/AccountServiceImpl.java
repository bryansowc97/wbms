package wbms.com.sg.accounts;


import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class AccountServiceImpl implements  AccountService {

  private final ComUserRepository comUserRepository;

  public AccountServiceImpl(ComUserRepository comUserRepository) {
    this.comUserRepository = comUserRepository;
  }

  @Override
  public ComUser testDb() {
    return comUserRepository.findByEmployeeId("P1234567");
  }



}
