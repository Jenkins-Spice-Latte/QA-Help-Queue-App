package com.qa.helpQueue.persistance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.qa.helpQueue.persistance.domain.Tickets;

public interface hqRepository extends JpaRepository<Tickets, Long> {

}
