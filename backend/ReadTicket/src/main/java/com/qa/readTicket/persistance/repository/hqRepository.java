package com.qa.readTicket.persistance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.qa.readTicket.persistance.domain.Tickets;

public interface hqRepository extends JpaRepository<Tickets, Long> {

}
