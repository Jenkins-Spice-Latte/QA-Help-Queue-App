package com.qa.helpQueue.persistance.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
public class Tickets {

	@Id //Primary Key
	@GeneratedValue(strategy = GenerationType.IDENTITY) //auto increment
	@Column
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
	
	public Tickets(){
	}

	public Long getTicketID() {
		return ticketID;
	}

	public void setTicketID(Long ticketID) {
		this.ticketID = ticketID;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Long getTime_created() {
		return time_created;
	}

	public void setTime_created(Long time_created) {
		this.time_created = time_created;
	}

	public String getTopic() {
		return topic;
	}

	public void setTopic(String topic) {
		this.topic = topic;
	}

	public Long getUrgency() {
		return urgency;
	}

	public void setUrgency(Long urgency) {
		this.urgency = urgency;
	}

	public boolean isComplete() {
		return complete;
	}

	public void setComplete(boolean complete) {
		this.complete = complete;
	}
	
	
	
}
