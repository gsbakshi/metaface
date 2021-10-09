-- Seed data with a fake user for testing

insert into users (name, email, entries, joined) values ('john', 'john@xyz.com', 5, '2018-01-01');
insert into login (hash, email) values ('$2a$10$wPNVsJLsp6hwTlCVC4g3a.nGbRxK9BJi0USisygH4j5.0Z2GB//be', 'john@xyz.com');

insert into users (name, email, entries, joined) values ('ann', 'ann@xyz.com', 0, '2018-01-01');
insert into login (hash, email) values ('$2a$10$HIEmWD6nWbxqM/IhYYtj4.eeHLP.GiWpVEbfIZ1r51iFubL4/LG6q', 'ann@xyz.com');
