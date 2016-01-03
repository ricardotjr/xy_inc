package br.com.ricardo.repository;

import java.io.Serializable;
import java.util.List;

import br.com.ricardo.controller.util.RepositoryException;

public interface GenericDao<E, K extends Serializable> {

	void saveOrUpdate(E entity) throws RepositoryException;

	E findById(K key) throws RepositoryException;

	List<E> list() throws RepositoryException;

}
