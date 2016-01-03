package br.com.ricardo.repository;

import java.math.BigDecimal;
import java.util.List;

import br.com.ricardo.controller.util.RepositoryException;
import br.com.ricardo.modal.POI;

public interface POIRepository extends GenericDao<POI, Integer> {

	List<POI> listByProximity(BigDecimal x, BigDecimal y, Integer distance) throws RepositoryException;

}
