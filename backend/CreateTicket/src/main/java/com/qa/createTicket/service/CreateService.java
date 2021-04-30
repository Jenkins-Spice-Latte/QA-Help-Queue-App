package com.qa.createTicket.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qa.createTicket.persistance.domain.Tickets;
import com.qa.createTicket.persistance.repository.hqRepository;

@Service
public class CreateService {
	
	private hqRepository repo;
	
	@Autowired
	public CreateService(hqRepository repo) {
		super();
		this.repo = repo;
	}
	
	public Tickets create(Tickets ticket) {
		Tickets created = this.repo.save(ticket);
		return created;
	}
	
	
}






