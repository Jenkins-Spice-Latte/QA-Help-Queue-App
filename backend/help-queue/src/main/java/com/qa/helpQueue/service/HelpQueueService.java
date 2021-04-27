package com.qa.helpQueue.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qa.helpQueue.exception.TicketNotFoundException;
import com.qa.helpQueue.persistance.domain.Tickets;
import com.qa.helpQueue.persistance.repository.hqRepository;

@Service
public class HelpQueueService {
	
	private hqRepository repo;
	
	@Autowired
	public HelpQueueService(hqRepository repo) {
		super();
		this.repo = repo;
	}
	
	public Tickets create(Tickets ticket) {
		Tickets created = this.repo.save(ticket);
		return created;
	}
	
	public List<Tickets> readAll() {
		List<Tickets> allTickets = this.repo.findAll();
		return allTickets;
	}
	
	public Tickets readById(Long ticketId) {
		Tickets ticketById = this.repo.findById(ticketId).orElseThrow(TicketNotFoundException::new);
		return ticketById;
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
	
	public boolean delete(Long ticketId) throws TicketNotFoundException {
		this.repo.deleteById(ticketId);
		return !this.repo.existsById(ticketId);
	}
	
	
}






