package wbms.com.sg.workspace.service;

import wbms.com.sg.workspace.dto.BookingDTO;
import wbms.com.sg.workspace.entity.Workspace;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import wbms.com.sg.workspace.repository.WorkspaceRepository;
import wbms.com.sg.workspace.common.RouteConstants;

import java.util.List;

@Service
@Transactional
public class WorkspaceServiceImpl implements WorkspaceService{

  @Autowired
  private RestTemplate restTemplate;

  @Autowired
  private WorkspaceRepository workspaceRepository;

  public List<BookingDTO> testBookingService() {

    ResponseEntity<List<BookingDTO>> response = restTemplate.exchange(
      RouteConstants.bookingGetAllApi,
      HttpMethod.GET,
      null,
      new ParameterizedTypeReference<List<BookingDTO>>() {}
    );

      return response.getBody();
  }

  public List<Workspace> findAll() {
    return workspaceRepository.findAll();
  }
}
