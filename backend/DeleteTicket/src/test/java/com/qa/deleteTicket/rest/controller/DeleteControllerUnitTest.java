package com.qa.deleteTicket.rest.controller;

import static org.mockito.Mockito.atLeastOnce;
import static org.mockito.Mockito.verify;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;

import com.qa.deleteTicket.persistance.domain.Tickets;
import com.qa.deleteTicket.rest.controller.DeleteController;
import com.qa.deleteTicket.service.DeleteService;

@SpringBootTest
public class DeleteControllerUnitTest {


	
	@Autowired
	private DeleteController controller;
	
	@MockBean
	private DeleteService service;
	
	private final Tickets TEST_TICKET_1 = new Tickets(1L, "Terraform bug", "Sonny", "Not applying correctly", 2452345L, "Terraform", 5L, false);
	private final Tickets TEST_TICKET_2 = new Tickets(2L, "Terraform bug", "Sonny", "Not applying correctly", 2452345L, "Terraform", 5L, false);
	private final Tickets TEST_TICKET_3 = new Tickets(3L, "Terraform bug", "Sonny", "Not applying correctly", 2452345L, "Terraform", 5L, false);
	
	private final List<Tickets> TICKETS = List.of(TEST_TICKET_1, TEST_TICKET_2, TEST_TICKET_3);
	
	
	@Test
	void deleteTest() throws Exception {
		this.controller.delete(TEST_TICKET_1.getTicketID());
		verify(this.service, atLeastOnce()).delete(TEST_TICKET_1.getTicketID());
	}
}
