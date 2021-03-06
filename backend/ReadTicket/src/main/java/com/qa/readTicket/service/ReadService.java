package com.qa.readTicket.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qa.readTicket.exception.TicketNotFoundException;
import com.qa.readTicket.persistance.domain.Tickets;
import com.qa.readTicket.persistance.repository.hqRepository;

@Service
public class ReadService {
	
	private hqRepository repo;
	
	@Autowired
	public ReadService(hqRepository repo) {
		super();
		this.repo = repo;
	}
	
	public List<Tickets> readAll() {
		List<Tickets> allTickets = this.repo.findAll();
		return allTickets;
	}
	
	public Tickets readById(Long ticketId) {
		Tickets ticketById = this.repo.findById(ticketId).orElseThrow(TicketNotFoundException::new);
		return ticketById;
	}
}






