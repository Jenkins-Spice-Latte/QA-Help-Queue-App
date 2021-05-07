package com.qa.createTicket.rest.controller;

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
import com.qa.createTicket.persistance.domain.Tickets;
import com.qa.createTicket.service.CreateService;

@SpringBootTest
public class CreateControllerUnitTest {
	
	@Autowired
	private CreateController controller;
	
	@MockBean
	private CreateService service;
	
	private final Tickets TEST_TICKET_1 = new Tickets(1L, "Terraform bug", "Sonny", "Not applying correctly", 2452345L, "Terraform", 5L, false);
	private final Tickets TEST_TICKET_2 = new Tickets(2L, "Terraform bug", "Sonny", "Not applying correctly", 2452345L, "Terraform", 5L, false);
	private final Tickets TEST_TICKET_3 = new Tickets(3L, "Terraform bug", "Sonny", "Not applying correctly", 2452345L, "Terraform", 5L, false);
	
	private final List<Tickets> TICKETS = List.of(TEST_TICKET_1, TEST_TICKET_2, TEST_TICKET_3);
	

	@Test
	void createTest() throws Exception {
		when(this.service.create(TEST_TICKET_1)).thenReturn(TEST_TICKET_1);
		assertThat(new ResponseEntity<Tickets>(this.service.create(TEST_TICKET_1), HttpStatus.CREATED))
					.isEqualTo(this.controller.create(TEST_TICKET_1));
		verify(this.service, atLeastOnce()).create(TEST_TICKET_1);
		}
	
}
