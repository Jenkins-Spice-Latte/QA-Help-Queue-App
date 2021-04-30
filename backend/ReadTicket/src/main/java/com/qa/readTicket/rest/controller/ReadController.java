package com.qa.readTicket.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.qa.readTicket.persistance.domain.Tickets;
import com.qa.readTicket.service.ReadService;

@CrossOrigin
@RestController
public class ReadController {
	
	private ReadService service;
	
	@Autowired
	public ReadController(ReadService service) {
		super();
		this.service = service;
	}
	
	//Read All
	@GetMapping("/readAll")
	public ResponseEntity<List<Tickets>> readAll(){
		return ResponseEntity.ok(this.service.readAll());
	}
	
	//Read By Id
	@GetMapping("/read/{ticketId}")
	public ResponseEntity<Tickets> readById(@PathVariable Long ticketId){
		Tickets ticketById = this.service.readById(ticketId);
		return ResponseEntity.ok(ticketById);
	}
}



















