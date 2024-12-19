-- init.sql

DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS room_prices;
DROP TABLE IF EXISTS guests;
DROP TABLE IF EXISTS room_images;

DROP TABLE IF EXISTS rooms CASCADE;
-- Créer la table des chambres
CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image VARCHAR(255) NOT NULL,
    capacity INT NOT NULL,
    default_price DECIMAL(10, 2) NOT NULL
);


CREATE TABLE room_images (
    id SERIAL PRIMARY KEY,
    room_id INT NOT NULL,
    image VARCHAR(255) NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);

CREATE TABLE room_prices (
    id SERIAL PRIMARY KEY,
    room_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    price_per_night DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    UNIQUE (room_id, start_date, end_date)
);

-- Créer la table des clients
CREATE TABLE guests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20)
);

-- Créer la table des réservations
CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    room_id INT NOT NULL,
    stripe_id VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    number_of_guests INT NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);

-- Insérer des données initiales (optionnel)
INSERT INTO rooms (name, description, image, capacity, default_price) VALUES
('Les Oliviers', 'Appartement de 2 chambres et 6 couchages', 'http://localhost:3000/appartements/oliviers/_3.jpeg',6,100),
('Les Lavandes', 'Appartement 1 chambre et 4 couchages', 'http://localhost:3000/appartements/lavandes/_1.jpeg', 4, 50),
('Salle de Réception', 'Salle  de réunion avec 50 places', 'http://localhost:3000/terrasses/reception/_2.jpg', 50, 100);

INSERT INTO guests (name, email, phone) VALUES
('Jean Dupont', 'jean.dupont@example.com', '0123456789'),
('Marie Curie', 'marie.curie@example.com', '0987654321');

-- Insérer des prix pour les chambres
INSERT INTO room_prices (room_id, start_date, end_date, price_per_night) VALUES
(1, '2023-01-01', '2023-06-30', 150.00),
(1, '2023-07-01', '2023-12-31', 180.00),
(2, '2023-01-01', '2023-06-30', 200.00),
(2, '2023-07-01', '2023-12-31', 220.00);
