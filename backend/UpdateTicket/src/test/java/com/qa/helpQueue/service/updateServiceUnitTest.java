package com.qa.helpQueue.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.atLeastOnce;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.qa.helpQueue.persistance.domain.Tickets;
import com.qa.helpQueue.persistance.repository.hqRepository;

@SpringBootTest
public class updateServiceUnitTest {
	
	@Autowired
	private UpdateService service;
	
	@MockBean
	private hqRepository repo;
	
	private final Tickets TEST_TICKET_1 = new Tickets(1L, "Terraform bug", "Sonny", "Not applying correctly", 2452345L, "Terraform", 5L, false);
	private final Tickets TEST_TICKET_2 = new Tickets(2L, "Terraform bug", "Sonny", "Not applying correctly", 2452345L, "Terraform", 5L, false);
	private final Tickets TEST_TICKET_3 = new Tickets(3L, "Terraform bug", "Sonny", "Not applying correctly", 2452345L, "Terraform", 5L, false);
	
	private final List<Tickets> TICKETS = List.of(TEST_TICKET_1, TEST_TICKET_2, TEST_TICKET_3);
	
	@Test
	void updateTest() throws Exception {
		when(this.repo.findById(TEST_TICKET_1.getTicketID())).thenReturn(Optional.of(TEST_TICKET_1));
		when(this.repo.save(TEST_TICKET_1)).thenReturn(TEST_TICKET_1);
		
		assertThat(this.service.update(TEST_TICKET_1.getTicketID(), TEST_TICKET_1)).isEqualTo(TEST_TICKET_1);
		
		verify(this.repo, atLeastOnce()).findById(TEST_TICKET_1.getTicketID());
		verify(this.repo, atLeastOnce()).save(TEST_TICKET_1);
		
	}

}
