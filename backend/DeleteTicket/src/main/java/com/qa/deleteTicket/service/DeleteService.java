package com.qa.deleteTicket.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qa.deleteTicket.exception.TicketNotFoundException;
import com.qa.deleteTicket.persistance.repository.hqRepository;

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






