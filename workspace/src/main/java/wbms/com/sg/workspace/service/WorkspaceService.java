package wbms.com.sg.workspace.service;

import wbms.com.sg.workspace.dto.BookingDTO;
import wbms.com.sg.workspace.entity.Workspace;

import java.util.List;
import java.util.Optional;

public interface WorkspaceService {

  public List<BookingDTO> testBookingService();

  public List<Workspace> findAll();

  public Workspace findById(Long id);
}
