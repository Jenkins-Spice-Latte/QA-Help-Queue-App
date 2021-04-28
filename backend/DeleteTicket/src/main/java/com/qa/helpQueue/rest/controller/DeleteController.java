package com.qa.helpQueue.rest.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.qa.helpQueue.persistance.domain.Tickets;
import com.qa.helpQueue.service.DeleteService;

@RestController
public class DeleteController {
	
	private DeleteService service;
	
	@Autowired
	public DeleteController(DeleteService service) {
		super();
		this.service = service;
	}
	
	@DeleteMapping("/delete/{ticketId}")
	public ResponseEntity<Tickets> delete(@PathVariable Long ticketId){
		if (this.service.delete(ticketId)) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}



















