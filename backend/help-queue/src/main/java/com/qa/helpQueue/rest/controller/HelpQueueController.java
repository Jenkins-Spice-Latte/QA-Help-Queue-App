package com.qa.helpQueue.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qa.helpQueue.persistance.domain.Tickets;
import com.qa.helpQueue.service.HelpQueueService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/helpQueue")
public class HelpQueueController {
	
	private HelpQueueService service;
	
	@Autowired
	public HelpQueueController(HelpQueueService service) {
		super();
		this.service = service;
	}

	//Create
	@PostMapping("/create")
	public ResponseEntity<Tickets> create(@RequestBody Tickets ticket){
		Tickets newTicket = this.service.create(ticket);
		return new ResponseEntity<>(newTicket, HttpStatus.CREATED);
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
	
	@PutMapping("/update/{ticketId}")
	public ResponseEntity<Tickets> update(@PathVariable Long ticketId, @RequestBody Tickets t){
		Tickets updatedTicket = this.service.update(ticketId, t);
		return new ResponseEntity<>(updatedTicket, HttpStatus.ACCEPTED);
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



















