package wbms.com.sg.workspace.entity;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "workspace_resc")
public class Workspace implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "name")
  private String name;

  @Column(name = "status")
  private Character status;

  @Column(name = "gp")
  private String gp;

  @Column(name = "sub_gp")
  private String subGp;

  @Column(name = "pos_grid")
  private Integer posGrid;

  @Column(name = "pos_rotation")
  private Character posRotation;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Character getStatus() {
    return status;
  }

  public void setStatus(Character status) {
    this.status = status;
  }

  public String getGp() {
    return gp;
  }

  public void setGp(String gp) {
    this.gp = gp;
  }

  public String getSubGp() {
    return subGp;
  }

  public void setSubGp(String subGp) {
    this.subGp = subGp;
  }

  public Integer getPosGrid() {
    return posGrid;
  }

  public void setPosGrid(Integer posGrid) {
    this.posGrid = posGrid;
  }

  public Character getPosRotation() {
    return posRotation;
  }

  public void setPosRotation(Character posRotation) {
    this.posRotation = posRotation;
  }
}
