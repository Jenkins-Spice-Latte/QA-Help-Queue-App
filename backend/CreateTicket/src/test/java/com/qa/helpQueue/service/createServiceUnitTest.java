package com.qa.helpQueue.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.atLeastOnce;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.qa.helpQueue.persistance.domain.Tickets;
import com.qa.helpQueue.persistance.repository.hqRepository;

@SpringBootTest
public class CreateServiceUnitTest {
	
	@Autowired
	private CreateService service;
	
	@MockBean
	private hqRepository repo;
	
	private final Tickets TEST_TICKET_1 = new Tickets("Terraform bug", "Sonny", "Not applying correctly", 2452345L, "Terraform", 5L, false);
	
	@Test
	void createTest() throws Exception {
		when(this.repo.save(TEST_TICKET_1)).thenReturn(TEST_TICKET_1);
		assertThat(this.service.create(TEST_TICKET_1)).isEqualTo(TEST_TICKET_1);
		verify(this.repo, atLeastOnce()).save(TEST_TICKET_1);
	}
	

}
