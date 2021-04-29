package com.qa.helpQueue.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qa.helpQueue.exception.TicketNotFoundException;
import com.qa.helpQueue.persistance.domain.Tickets;
import com.qa.helpQueue.persistance.repository.hqRepository;

@Service
public class UpdateService {
	
	private hqRepository repo;
	
	@Autowired
	public UpdateService(hqRepository repo) {
		super();
		this.repo = repo;
	}
	
	public Tickets update(Long ticketId, Tickets ticket) {
		Tickets ticketToUpdate = this.repo.findById(ticketId).orElseThrow(TicketNotFoundException::new);

		ticketToUpdate.setAuthor(ticket.getAuthor());
		ticketToUpdate.setTitle(ticket.getTitle());
		ticketToUpdate.setDescription(ticket.getDescription());
		ticketToUpdate.setTopic(ticket.getTopic());
		ticketToUpdate.setUrgency(ticket.getUrgency());
		ticketToUpdate.setComplete(ticket.isComplete());
		
		return this.repo.save(ticketToUpdate);
	}
}






