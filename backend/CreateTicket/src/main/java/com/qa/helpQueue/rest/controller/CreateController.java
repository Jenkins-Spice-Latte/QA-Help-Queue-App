package com.qa.helpQueue.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qa.helpQueue.persistance.domain.Tickets;
import com.qa.helpQueue.service.CreateService;

import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin
@RestController
public class CreateController {
	
	private CreateService service;
	
	@Autowired
	public CreateController(CreateService service) {
		super();
		this.service = service;
	}

	//Create
	@PostMapping("/create")
	public ResponseEntity<Tickets> create(@RequestBody Tickets ticket){
		Tickets newTicket = this.service.create(ticket);
		return new ResponseEntity<>(newTicket, HttpStatus.CREATED);
	}
}


















