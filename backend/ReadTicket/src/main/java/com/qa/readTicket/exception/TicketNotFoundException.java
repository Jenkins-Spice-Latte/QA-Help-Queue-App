package com.qa.readTicket.exception;

import javax.persistence.EntityNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Ticket does not exist")
public class TicketNotFoundException extends EntityNotFoundException {

}
