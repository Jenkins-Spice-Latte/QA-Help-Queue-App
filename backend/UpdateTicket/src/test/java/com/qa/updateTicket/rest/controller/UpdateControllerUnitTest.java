package com.qa.updateTicket.rest.controller;

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
import org.springframework.test.context.ActiveProfiles;

import com.qa.updateTicket.persistance.domain.Tickets;
import com.qa.updateTicket.rest.controller.UpdateController;
import com.qa.updateTicket.service.UpdateService;

@SpringBootTest
@ActiveProfiles(profiles = "test")
public class UpdateControllerUnitTest {

	
	@Autowired
	private UpdateController controller;
	
	@MockBean
	private UpdateService service;
	
	private final Tickets TEST_TICKET_1 = new Tickets(1L, "Terraform bug", "Sonny", "Not applying correctly", 2452345L, "Terraform", 5L, false);
	private final Tickets TEST_TICKET_2 = new Tickets(2L, "Terraform bug", "Sonny", "Not applying correctly", 2452345L, "Terraform", 5L, false);
	private final Tickets TEST_TICKET_3 = new Tickets(3L, "Terraform bug", "Sonny", "Not applying correctly", 2452345L, "Terraform", 5L, false);
	
	private final List<Tickets> TICKETS = List.of(TEST_TICKET_1, TEST_TICKET_2, TEST_TICKET_3);
	
	@Test
	void updateTest() throws Exception {
		when(this.service.update(TEST_TICKET_1.getTicketID(), TEST_TICKET_1)).thenReturn(TEST_TICKET_1);
		assertThat(new ResponseEntity<Tickets>(TEST_TICKET_1, HttpStatus.ACCEPTED))
					.isEqualTo(this.controller.update(TEST_TICKET_1.getTicketID(), TEST_TICKET_1));
		verify(this.service, atLeastOnce()).update(TEST_TICKET_1.getTicketID(), TEST_TICKET_1);
	}
	
}
