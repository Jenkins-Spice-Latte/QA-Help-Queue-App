package com.qa.helpQueue.rest.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.atLeastOnce;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.qa.helpQueue.persistance.domain.Tickets;
import com.qa.helpQueue.service.ReadService;

@SpringBootTest
public class readControllerUnitTest {

	@Autowired
	private ReadController controller;
	
	@MockBean
	private ReadService service;
	
	private final Tickets TEST_TICKET_1 = new Tickets("Terraform bug", "Sonny", "Not applying correctly", 2452345L, "Terraform", 5L, false);
	private final Tickets TEST_TICKET_2 = new Tickets("Terraform bug", "Sonny", "Not applying correctly", 2452345L, "Terraform", 5L, false);
	private final Tickets TEST_TICKET_3 = new Tickets("Terraform bug", "Sonny", "Not applying correctly", 2452345L, "Terraform", 5L, false);
	
	private final List<Tickets> TICKETS = List.of(TEST_TICKET_1, TEST_TICKET_2, TEST_TICKET_3);
	
	@Test
	void readAllTest() throws Exception {
		when(this.service.readAll()).thenReturn(TICKETS);
		assertThat(this.controller.readAll().getBody().isEmpty()).isFalse();
		verify(this.service, atLeastOnce()).readAll();
	}
	
	@Test
	void readById() throws Exception {
		when(this.service.readById(TEST_TICKET_1.getTicketID())).thenReturn(TEST_TICKET_1);
		assertThat(new ResponseEntity<Tickets>(this.service.readById(TEST_TICKET_1.getTicketID()), HttpStatus.OK))
					.isEqualTo(this.controller.readById(TEST_TICKET_1.getTicketID()));
		verify(this.service, atLeastOnce()).readById(TEST_TICKET_1.getTicketID());
	}
}