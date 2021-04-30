package com.qa.updateTicket.persistance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.qa.updateTicket.persistance.domain.Tickets;

public interface hqRepository extends JpaRepository<Tickets, Long> {

}
