package com.qa.createTicket.persistance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.qa.createTicket.persistance.domain.Tickets;

public interface hqRepository extends JpaRepository<Tickets, Long> {

}
