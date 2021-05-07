package com.qa.updateTicket.rest.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qa.updateTicket.persistance.domain.Tickets;
import com.qa.updateTicket.service.UpdateService;

import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin
@RestController
public class UpdateController {
	
	private UpdateService service;
	
	@Autowired
	public UpdateController(UpdateService service) {
		super();
		this.service = service;
	}
	
	@PutMapping("/update/{ticketId}")
	public ResponseEntity<Tickets> update(@PathVariable Long ticketId, @RequestBody Tickets t){
		Tickets updatedTicket = this.service.update(ticketId, t);
		return new ResponseEntity<>(updatedTicket, HttpStatus.ACCEPTED);
	}

}



















