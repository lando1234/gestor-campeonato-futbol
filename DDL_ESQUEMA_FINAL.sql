-- DDL COMPLETO DEL ESQUEMA FINAL

CREATE TABLE categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    fecha_inicio DATE,
    fecha_fin DATE,
    genero VARCHAR(1),
    tipo ENUM('infantil','juvenil') NOT NULL
);

CREATE TABLE torneo (
    id_torneo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    estado VARCHAR(20),
    fecha_inicio DATE,
    fecha_fin DATE
);

CREATE TABLE responsable (
    id_responsable INT AUTO_INCREMENT PRIMARY KEY,
    dni BIGINT NOT NULL UNIQUE,
    nombre VARCHAR(250) NOT NULL,
    telefono VARCHAR(45),
    email VARCHAR(100)
);

CREATE TABLE jugador (
    id_jugador INT AUTO_INCREMENT PRIMARY KEY,
    dni VARCHAR(10) NOT NULL UNIQUE,
    nombre VARCHAR(200) NOT NULL,
    sexo VARCHAR(1) NOT NULL,
    fecha_nacimiento DATE,
    telefono VARCHAR(45),
    emergencia_contacto VARCHAR(200),
    socio_club BOOLEAN DEFAULT FALSE,
    nivel VARCHAR(45),
    grado VARCHAR(10),
    responsable_entrenador BOOLEAN DEFAULT FALSE,
    id_responsable INT,
    FOREIGN KEY (id_responsable) REFERENCES responsable(id_responsable)
);

CREATE TABLE inscripcion (
    id_inscripcion INT AUTO_INCREMENT PRIMARY KEY,
    id_jugador INT NOT NULL,
    id_torneo INT NOT NULL,
    id_categoria INT NOT NULL,
    socio BOOLEAN,
    monto DECIMAL(10,2),
    aprobado BOOLEAN,
    UNIQUE(id_jugador, id_torneo),
    FOREIGN KEY (id_jugador) REFERENCES jugador(id_jugador),
    FOREIGN KEY (id_torneo) REFERENCES torneo(id_torneo),
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
);

CREATE TABLE equipo (
    id_equipo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_torneo INT NOT NULL,
    id_categoria INT NOT NULL,
    tipo_equipo ENUM('infantil','juvenil') NOT NULL,
    zona VARCHAR(20),
    FOREIGN KEY (id_torneo) REFERENCES torneo(id_torneo),
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria),
    INDEX idx_equipo_categoria (id_categoria),
    INDEX idx_equipo_torneo (id_torneo)
);

CREATE TABLE equipo_jugador (
    id_equipo INT NOT NULL,
    id_jugador INT NOT NULL,
    puesto VARCHAR(45),
    nivel VARCHAR(45),
    PRIMARY KEY (id_equipo, id_jugador),
    FOREIGN KEY (id_equipo) REFERENCES equipo(id_equipo),
    FOREIGN KEY (id_jugador) REFERENCES jugador(id_jugador)
);

CREATE TABLE fixture (
    id_fixture INT AUTO_INCREMENT PRIMARY KEY,
    id_torneo INT NOT NULL,
    id_categoria INT NOT NULL,
    id_equipo1 INT NOT NULL,
    id_equipo2 INT NOT NULL,
    fecha DATETIME,
    cancha VARCHAR(100),
    estado VARCHAR(20),
    resultado1 INT,
    resultado2 INT,
    observaciones VARCHAR(300),
    FOREIGN KEY (id_torneo) REFERENCES torneo(id_torneo),
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria),
    FOREIGN KEY (id_equipo1) REFERENCES equipo(id_equipo),
    FOREIGN KEY (id_equipo2) REFERENCES equipo(id_equipo),
    INDEX idx_fixture_categoria (id_categoria),
    INDEX idx_fixture_torneo (id_torneo)
);

CREATE TABLE gol (
    id_fixture INT NOT NULL,
    id_jugador INT NOT NULL,
    minuto INT NOT NULL,
    tipo VARCHAR(45),
    PRIMARY KEY (id_fixture, id_jugador, minuto),
    FOREIGN KEY (id_fixture) REFERENCES fixture(id_fixture),
    FOREIGN KEY (id_jugador) REFERENCES jugador(id_jugador)
);

CREATE TABLE tarjeta (
    id_fixture INT NOT NULL,
    id_jugador INT NOT NULL,
    minuto INT NOT NULL,
    tipo VARCHAR(45),
    PRIMARY KEY (id_fixture, id_jugador, minuto),
    FOREIGN KEY (id_fixture) REFERENCES fixture(id_fixture),
    FOREIGN KEY (id_jugador) REFERENCES jugador(id_jugador)
);

CREATE TABLE pago_jugador (
    id_pago INT AUTO_INCREMENT PRIMARY KEY,
    id_responsable INT NOT NULL,
    id_inscripcion INT NOT NULL,
    fecha DATE,
    lugar VARCHAR(100),
    recibo VARCHAR(50),
    monto DECIMAL(10,2),
    FOREIGN KEY (id_responsable) REFERENCES responsable(id_responsable),
    FOREIGN KEY (id_inscripcion) REFERENCES inscripcion(id_inscripcion),
    INDEX idx_pago_jugador_responsable (id_responsable),
    INDEX idx_pago_jugador_inscripcion (id_inscripcion)
);

CREATE TABLE pago_equipo (
    id_pago INT AUTO_INCREMENT PRIMARY KEY,
    id_responsable INT NOT NULL,
    id_equipo INT NOT NULL,
    fecha DATE,
    lugar VARCHAR(100),
    recibo VARCHAR(50),
    monto DECIMAL(10,2),
    FOREIGN KEY (id_responsable) REFERENCES responsable(id_responsable),
    FOREIGN KEY (id_equipo) REFERENCES equipo(id_equipo),
    INDEX idx_pago_equipo_resp (id_responsable),
    INDEX idx_pago_equipo_eq (id_equipo)
);

CREATE TABLE sponsor (
    id_sponsor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion VARCHAR(255),
    url_logo VARCHAR(255),
    link_pagina VARCHAR(255),
    orden INT,
    principal BOOLEAN DEFAULT FALSE
);

CREATE TABLE sponsor_categoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_sponsor INT NOT NULL,
    id_categoria INT NOT NULL,
    principal BOOLEAN DEFAULT FALSE,
    orden INT,
    FOREIGN KEY (id_sponsor) REFERENCES sponsor(id_sponsor),
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria),
    UNIQUE(id_sponsor, id_categoria)
);

CREATE TABLE categoria_config (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT NOT NULL,
    jugadores TINYINT DEFAULT 0,
    equipos TINYINT DEFAULT 0,
    fixtures TINYINT DEFAULT 0,
    posiciones TINYINT DEFAULT 0,
    texto LONGTEXT,
    reglamento VARCHAR(255) DEFAULT 'empty',
    ver_jugadores TINYINT DEFAULT 0,
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
);

CREATE TABLE texto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    clave VARCHAR(100) UNIQUE,
    contenido LONGTEXT
);

CREATE TABLE configuracion (
    clave VARCHAR(100) PRIMARY KEY,
    valor VARCHAR(255)
);

CREATE TABLE tabla_posicion (
    id_posicion INT AUTO_INCREMENT PRIMARY KEY,
    id_torneo INT NOT NULL,
    id_categoria INT NOT NULL,
    id_equipo INT NOT NULL,
    zona VARCHAR(20) NOT NULL,
    pj INT DEFAULT 0,
    g INT DEFAULT 0,
    e INT DEFAULT 0,
    p INT DEFAULT 0,
    gf INT DEFAULT 0,
    gc INT DEFAULT 0,
    dif INT DEFAULT 0,
    pts INT DEFAULT 0,
    fecha_calculo DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_torneo) REFERENCES torneo(id_torneo),
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria),
    FOREIGN KEY (id_equipo) REFERENCES equipo(id_equipo),
    UNIQUE(id_torneo, id_categoria, zona, id_equipo),
    INDEX idx_tabla_pos (id_torneo, id_categoria, zona)
);
