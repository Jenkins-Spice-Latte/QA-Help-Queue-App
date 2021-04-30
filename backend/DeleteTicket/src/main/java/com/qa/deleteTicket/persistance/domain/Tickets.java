package com.qa.deleteTicket.persistance.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Tickets {

	@Id //Primary Key
	@GeneratedValue(strategy = GenerationType.IDENTITY) //auto increment
	private Long ticketID;
	
	@Column
	private String title;
		
	@Column
	private String author;
	
	@Column
	private String description;
	
	@Column
	private Long time_created;
	
	@Column 
	private String topic;
	
	@Column
	private Long urgency;
	
	@Column
	private boolean complete;
	
	

	public Tickets(Long ticketID, String title, String author, String description, Long time_created, String topic,
			Long urgency, boolean complete) {
		super();
		this.ticketID = ticketID;
		this.title = title;
		this.author = author;
		this.description = description;
		this.time_created = time_created;
		this.topic = topic;
		this.urgency = urgency;
		this.complete = complete;
	}

	public Tickets() {
	}
	
	public Long getTicketID() {
		return ticketID;
	}
	
	public String getTitle() {
		return title;
	}

	public String getAuthor() {
		return author;
	}

	public String getDescription() {
		return description;
	}

	public Long getTime_created() {
		return time_created;
	}

	public String getTopic() {
		return topic;
	}

	public Long getUrgency() {
		return urgency;
	}

	public boolean isComplete() {
		return complete;
	}

	
	
	
}
