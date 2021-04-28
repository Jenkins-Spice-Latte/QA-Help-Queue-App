package com.qa.helpQueue.rest.controller;

import static org.mockito.Mockito.atLeastOnce;
import static org.mockito.Mockito.verify;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.qa.helpQueue.persistance.domain.Tickets;
import com.qa.helpQueue.service.DeleteService;

@SpringBootTest
public class deleteControllerUnitTest {


	
	@Autowired
	private DeleteController controller;
	
	@MockBean
	private DeleteService service;
	
	private final Tickets TEST_TICKET_1 = new Tickets("Terraform bug", "Sonny", "Not applying correctly", 2452345L, "Terraform", 5L, false);
	private final Tickets TEST_TICKET_2 = new Tickets("Terraform bug", "Sonny", "Not applying correctly", 2452345L, "Terraform", 5L, false);
	private final Tickets TEST_TICKET_3 = new Tickets("Terraform bug", "Sonny", "Not applying correctly", 2452345L, "Terraform", 5L, false);
	
	private final List<Tickets> TICKETS = List.of(TEST_TICKET_1, TEST_TICKET_2, TEST_TICKET_3);
	
	
	@Test
	void deleteTest() throws Exception {
		this.controller.delete(TEST_TICKET_1.getTicketID());
		verify(this.service, atLeastOnce()).delete(TEST_TICKET_1.getTicketID());
	}
}
