package com.qa.deleteTicket.persistance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.qa.deleteTicket.persistance.domain.Tickets;

public interface hqRepository extends JpaRepository<Tickets, Long> {

}
