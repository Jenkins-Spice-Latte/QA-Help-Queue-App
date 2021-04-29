package com.qa.helpQueue.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qa.helpQueue.exception.TicketNotFoundException;
import com.qa.helpQueue.persistance.repository.hqRepository;

@Service
public class DeleteService {
	
	private hqRepository repo;
	
	@Autowired
	public DeleteService(hqRepository repo) {
		super();
		this.repo = repo;
	}
	
	public boolean delete(Long ticketId) throws TicketNotFoundException {
		this.repo.deleteById(ticketId);
		return !this.repo.existsById(ticketId);
	}
	
	
}






