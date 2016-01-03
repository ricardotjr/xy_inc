package br.com.ricardo.repository;

import java.math.BigDecimal;
import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import br.com.ricardo.controller.util.RepositoryException;
import br.com.ricardo.modal.POI;

@Repository
@Transactional(propagation = Propagation.REQUIRED)
public class POIRepositoryImpl extends HibernateDao<POI, Integer> implements POIRepository {

	@SuppressWarnings("unchecked")
	@Override
	public List<POI> listByProximity(BigDecimal x, BigDecimal y, Integer distance) throws RepositoryException {
		try {
			Query query = getSession().getNamedQuery("fn_poi");
			query.setParameter("Y", y);
			query.setParameter("X", x);
			query.setParameter("DISTANCE", distance);
			return query.list();
		} catch (Exception ex) {
			throw new RepositoryException("Erro ao buscar pontos por proximidade!", ex);
		}
	}

}
