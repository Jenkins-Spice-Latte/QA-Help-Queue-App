
-- INSERT INTO Tickets (author, complete, title, time_created, description, topic, urgency) VALUES ('Luke', 0, 'terraform broke', '92658849', 'FILLERDESCRIPTION', 'terraform', 5);
-- INSERT INTO Tickets (author, complete, title, time_created, description, topic, urgency) VALUES ('Sonny', 1, 'java uninstalled itself', '38492837', 'FILLERDESCRIPTION', 'java', 5);
-- INSERT INTO Tickets (author, complete, title, time_created, description, topic, urgency) VALUES ('Manish', 0, 'EKS wont create', '89957463', 'FILLERDESCRIPTION', 'K8S/AWS', 5);
-- INSERT INTO Tickets (author, complete, title, time_created, description, topic, urgency) VALUES ('Moksh', 0, 'problems with react', '77765654', 'FILLERDESCRIPTION', 'react', 5);
-- INSERT INTO Tickets (author, complete, title, time_created, description, topic, urgency) VALUES ('Vinesh', 1, 'test', '77762517', 'FILLERDESCRIPTION', 'test', 5);
-- INSERT INTO Tickets (author, complete, title, time_created, description, topic, urgency) VALUES ('Zonaira', 0, 'NGINX isnt working', '88827454', 'FILLERDESCRIPTION', 'nginx', 5);

INSERT INTO tickets(ticketid, title, author, description, time_created, topic, urgency, complete) VALUES (1, 'terraform broke', 'Luke', 'FILLERDESCRIPTION', 92658849, 'terraform', 5, false);
INSERT INTO tickets(ticketid, title, author, description, time_created, topic, urgency, complete) VALUES (2, 'java uninstalled itself', 'Sonny', 'FILLERDESCRIPTION', 38492837, 'java', 5, true);
INSERT INTO tickets(ticketid, title, author, description, time_created, topic, urgency, complete) VALUES (3, 'EKS wont create', 'Manish', 'FILLERDESCRIPTION', 89957463, 'K8S/AWS', 5, false);
INSERT INTO tickets(ticketid, title, author, description, time_created, topic, urgency, complete) VALUES (4, 'problems with react', 'Moksh', 'FILLERDESCRIPTION', 77765654, 'react', 5, false);
INSERT INTO tickets(ticketid, title, author, description, time_created, topic, urgency, complete) VALUES (5, 'test', 'Vinesh', 'FILLERDESCRIPTION', 77762517, 'test', 5, true);
INSERT INTO tickets(ticketid, title, author, description, time_created, topic, urgency, complete) VALUES(6, 'NGINX isnt working', 'Zonaira', 'FILLERDESCRIPTION', 88827454, 'nginx', 5, false);