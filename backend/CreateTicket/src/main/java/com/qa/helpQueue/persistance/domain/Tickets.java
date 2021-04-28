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
@AllArgsConstructor
@NoArgsConstructor
@Data
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
	
}
