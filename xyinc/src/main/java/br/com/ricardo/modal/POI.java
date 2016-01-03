package br.com.ricardo.modal;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.NamedNativeQueries;
import org.hibernate.annotations.NamedNativeQuery;

@Entity
@Table(name = "POI")
@NamedNativeQueries({ @NamedNativeQuery(name = "fn_poi", query = "SELECT * FROM FN_POI(:Y, :X, :DISTANCE)", resultClass = POI.class) })
public class POI implements Serializable {

	private static final long serialVersionUID = 4059743069847796461L;
	@Id
	@SequenceGenerator(name = "poi_id_seq", sequenceName = "poi_id_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "poi_id_seq")
	@Column(name = "ID")
	private Integer id;
	@Column(name = "NOME")
	private String name;
	@Column(name = "X")
	private BigDecimal x;
	@Column(name = "Y")
	private BigDecimal y;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public BigDecimal getX() {
		return x;
	}

	public void setX(BigDecimal x) {
		this.x = x;
	}

	public BigDecimal getY() {
		return y;
	}

	public void setY(BigDecimal y) {
		this.y = y;
	}

}
