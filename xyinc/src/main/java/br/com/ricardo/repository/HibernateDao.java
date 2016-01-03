package br.com.ricardo.repository;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import br.com.ricardo.controller.util.RepositoryException;

@SuppressWarnings("unchecked")
@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
public class HibernateDao<E, K extends Serializable> implements GenericDao<E, K> {

	private SessionFactory sessionFactory;
	protected Class<? extends E> daoType;

	public HibernateDao() {
		daoType = (Class<E>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
	}

	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	protected Session getSession() {
		return sessionFactory.getCurrentSession();
	}

	@Override
	public void saveOrUpdate(E entity) throws RepositoryException {
		try {
			getSession().saveOrUpdate(entity);
		} catch (Exception ex) {
			throw new RepositoryException("Ocorreu um erro inesperado ao salvar/atualizar a entidade!", ex);
		}
	}

	@Override
	public E findById(K key) throws RepositoryException {
		try {
			return (E) getSession().get(daoType, key);
		} catch (Exception ex) {
			throw new RepositoryException("Ocorreu um erro inesperado ao buscar entidade pelo id!", ex);
		}
	}

	@Override
	public List<E> list() throws RepositoryException {
		try {
			return getSession().createCriteria(daoType).list();
		} catch (Exception ex) {
			throw new RepositoryException("Ocorreu um erro inesperado ao listar todas entidades!", ex);
		}
	}

	public Criteria getCriteria() {
		return getSession().createCriteria(daoType);
	}

}
