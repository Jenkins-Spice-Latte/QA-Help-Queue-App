
-- INSERT INTO Tickets (author, complete, title, time_created, description, topic, urgency) VALUES ('Luke', 0, 'terraform broke', '92658849', 'FILLERDESCRIPTION', 'terraform', 5);
-- INSERT INTO Tickets (author, complete, title, time_created, description, topic, urgency) VALUES ('Sonny', 1, 'java uninstalled itself', '38492837', 'FILLERDESCRIPTION', 'java', 5);
-- INSERT INTO Tickets (author, complete, title, time_created, description, topic, urgency) VALUES ('Manish', 0, 'EKS wont create', '89957463', 'FILLERDESCRIPTION', 'K8S/AWS', 5);
-- INSERT INTO Tickets (author, complete, title, time_created, description, topic, urgency) VALUES ('Moksh', 0, 'problems with react', '77765654', 'FILLERDESCRIPTION', 'react', 5);
-- INSERT INTO Tickets (author, complete, title, time_created, description, topic, urgency) VALUES ('Vinesh', 1, 'test', '77762517', 'FILLERDESCRIPTION', 'test', 5);
-- INSERT INTO Tickets (author, complete, title, time_created, description, topic, urgency) VALUES ('Zonaira', 0, 'NGINX isnt working', '88827454', 'FILLERDESCRIPTION', 'nginx', 5);

INSERT INTO tickets(title, author, description, time_created, topic, urgency, complete) VALUES ('terraform broke', 'Luke', 'FILLERDESCRIPTION', 92658849L, 'terraform', 5L, false);
INSERT INTO tickets(title, author, description, time_created, topic, urgency, complete) VALUES ('java uninstalled itself', 'Sonny', 'FILLERDESCRIPTION', 38492837L, 'java', 5L, true);
INSERT INTO tickets(title, author, description, time_created, topic, urgency, complete) VALUES ('EKS wont create', 'Manish', 'FILLERDESCRIPTION', 89957463L, 'K8S/AWS', 5L, false);
INSERT INTO tickets(title, author, description, time_created, topic, urgency, complete) VALUES ('problems with react', 'Moksh', 'FILLERDESCRIPTION', 77765654L, 'react', 5L, false);
INSERT INTO tickets(title, author, description, time_created, topic, urgency, complete) VALUES ('test', 'Vinesh', 'FILLERDESCRIPTION', 77762517L, 'test', 5L, true);
INSERT INTO tickets(title, author, description, time_created, topic, urgency, complete) VALUES('NGINX isnt working', 'Zonaira', 'FILLERDESCRIPTION', 88827454L, 'nginx', 5L, false);