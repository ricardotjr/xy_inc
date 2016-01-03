package br.com.ricardo.controller;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import br.com.ricardo.controller.util.ResponseMessage;
import br.com.ricardo.modal.POI;
import br.com.ricardo.repository.POIRepository;

@Controller
public class POIController {

	@Autowired
	private POIRepository poiRepository;
	
	@RequestMapping(method = RequestMethod.POST, value = "/POI/list")
	public @ResponseBody Object listAll() {

		try {
			return poiRepository.list();
		} catch (Exception e) {
			return ResponseMessage.errorMessage(e.getMessage());
		}
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/POI/listByProximity", params = { "x", "y", "distance" })
	public @ResponseBody Object listByProximity(BigDecimal x, BigDecimal y, Integer distance) {
		try {
			return poiRepository.listByProximity(x, y, distance);
		} catch (Exception e) {
			return ResponseMessage.errorMessage(e.getMessage());
		}
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/POI/save", params = { "name", "x", "y" })
	public @ResponseBody ResponseMessage save(String name, BigDecimal x, BigDecimal y) {
		
		try {
			List<String> errors = new ArrayList<String>();
			if (StringUtils.isBlank(name)) {
				errors.add("Preencha o campo 'Nome'!");
			}
			if (x == null || x.signum() == -1) {
				errors.add("O valor de 'X' deve ser maior que 0!");
			}
			if (y == null || y.signum() == -1) {
				errors.add("O valor de 'Y' deve ser maior que 0!");
			}
			if (!errors.isEmpty()) {
				return ResponseMessage.errorMessage(errors);
			}
			POI poi = new POI();
			poi.setName(name);
			poi.setX(x);
			poi.setY(y);
			poiRepository.saveOrUpdate(poi);
			return ResponseMessage.success();
		} catch (Exception e) {
			return ResponseMessage.errorMessage(e.getMessage());
		}
	}
}
