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
public class ReadServiceUnitTest {
	
	@Autowired
	private ReadService service;
	
	@MockBean
	private hqRepository repo;
	
	private final Tickets TEST_TICKET_1 = new Tickets("Terraform bug", "Sonny", "Not applying correctly", 2452345L, "Terraform", 5L, false);
	private final Tickets TEST_TICKET_2 = new Tickets("Terraform bug", "Sonny", "Not applying correctly", 2452345L, "Terraform", 5L, false);
	private final Tickets TEST_TICKET_3 = new Tickets("Terraform bug", "Sonny", "Not applying correctly", 2452345L, "Terraform", 5L, false);
	
	private final List<Tickets> TICKETS = List.of(TEST_TICKET_1, TEST_TICKET_2, TEST_TICKET_3);
	
	@Test
	void readAllTest() throws Exception {
		when(this.repo.findAll()).thenReturn(TICKETS);
		assertThat(this.service.readAll().isEmpty()).isFalse();
		verify(this.repo, atLeastOnce()).findAll();
	}
	
	@Test
	void readByIdTest() throws Exception {
		when(this.repo.findById(TEST_TICKET_1.getTicketID())).thenReturn(Optional.of(TEST_TICKET_1));
		assertThat(this.service.readById(TEST_TICKET_1.getTicketID())).isEqualTo(TEST_TICKET_1);
		verify(this.repo, atLeastOnce()).findById(TEST_TICKET_1.getTicketID());
	}
	

}