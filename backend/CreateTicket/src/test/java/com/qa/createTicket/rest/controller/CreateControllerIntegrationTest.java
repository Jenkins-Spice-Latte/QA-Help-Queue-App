package com.qa.createTicket.rest.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.Sql.ExecutionPhase;
import org.springframework.test.web.servlet.MockMvc;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.qa.createTicket.persistance.domain.Tickets;


@SpringBootTest
@AutoConfigureMockMvc
@Sql(scripts = {"classpath:schema.sql" , "classpath:data.sql"}, executionPhase = ExecutionPhase.BEFORE_TEST_METHOD)
public class CreateControllerIntegrationTest {

	@Autowired
	private MockMvc mockMvc;
	
	@Autowired
	private ObjectMapper jsonifier; //POJO -> JSON
	
	
	private final Tickets TEST_TICKET_1 = new Tickets(1L, "terraform broke", "Luke", "FILLERDESCRIPTION", 92658849L, "terraform", 5L, false);
	private final Tickets TEST_TICKET_2 = new Tickets(2L, "java uninstalled itself", "Sonny", "FILLERDESCRIPTION", 38492837L, "java", 5L, true);
	private final Tickets TEST_TICKET_3 = new Tickets(3L, "EKS wont create", "Manish", "FILLERDESCRIPTION", 89957463L, "K8S/AWS", 5L, false);
	private final Tickets TEST_TICKET_4 = new Tickets(4L, "problems with react", "Moksh", "FILLERDESCRIPTION", 77765654L, "react", 5L, false);
	private final Tickets TEST_TICKET_5 = new Tickets(5L, "test", "Vinesh", "FILLERDESCRIPTION", 77762517L, "test", 5L, true);
	private final Tickets TEST_TICKET_6 = new Tickets(6L, "NGINX isnt working", "Zonaira", "FILLERDESCRIPTION", 88827454L, "nginx", 5L, false);
	
	
	private final List<Tickets> TICKETS = List.of(TEST_TICKET_1, TEST_TICKET_2, TEST_TICKET_3, TEST_TICKET_4, TEST_TICKET_5, TEST_TICKET_6);
	
	@Test
	void createTest() throws Exception {
		
		String mockPost= this.jsonifier.writeValueAsString(TEST_TICKET_1);
		
		this.mockMvc.perform(post("/create").accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON).content(mockPost))
                .andExpect(status().isCreated())
                .andExpect(content().json(mockPost));
	}
	
	
}
