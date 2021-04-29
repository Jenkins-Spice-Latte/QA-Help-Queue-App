package com.qa.helpQueue.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qa.helpQueue.persistance.domain.Tickets;
import com.qa.helpQueue.persistance.repository.hqRepository;

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






