-- ===========================
-- >>>   BASE DE DATOS FUTBOL
-- ===========================

CREATE TABLE categoria (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    fecha_inicio DATE,
    fecha_fin DATE,
    genero VARCHAR(1),
    tipo VARCHAR(10) NOT NULL CHECK(tipo IN ('infantil','juvenil'))
);

CREATE TABLE torneo (
    id_torneo SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    estado VARCHAR(20),
    fecha_inicio DATE,
    fecha_fin DATE
);

CREATE TABLE responsable (
    id_responsable SERIAL PRIMARY KEY,
    dni BIGINT NOT NULL UNIQUE,
    nombre VARCHAR(250) NOT NULL,
    telefono VARCHAR(45),
    email VARCHAR(100)
);

CREATE TABLE jugador (
    id_jugador SERIAL PRIMARY KEY,
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
    id_responsable INT REFERENCES responsable(id_responsable)
);

CREATE TABLE inscripcion (
    id_inscripcion SERIAL PRIMARY KEY,
    id_jugador INT NOT NULL REFERENCES jugador(id_jugador),
    id_torneo INT NOT NULL REFERENCES torneo(id_torneo),
    id_categoria INT NOT NULL REFERENCES categoria(id_categoria),
    socio BOOLEAN,
    monto DECIMAL(10,2),
    aprobado BOOLEAN,
    UNIQUE(id_jugador, id_torneo)
);

CREATE TABLE equipo (
    id_equipo SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_torneo INT NOT NULL REFERENCES torneo(id_torneo),
    id_categoria INT NOT NULL REFERENCES categoria(id_categoria),
    tipo_equipo VARCHAR(10) NOT NULL CHECK(tipo_equipo IN ('infantil','juvenil')),
    zona VARCHAR(20)
);

CREATE INDEX idx_equipo_categoria ON equipo(id_categoria);
CREATE INDEX idx_equipo_torneo ON equipo(id_torneo);

CREATE TABLE equipo_jugador (
    id_equipo INT NOT NULL REFERENCES equipo(id_equipo),
    id_jugador INT NOT NULL REFERENCES jugador(id_jugador),
    puesto VARCHAR(45),
    nivel VARCHAR(45),
    PRIMARY KEY (id_equipo, id_jugador)
);

CREATE TABLE fixture (
    id_fixture SERIAL PRIMARY KEY,
    id_torneo INT NOT NULL REFERENCES torneo(id_torneo),
    id_categoria INT NOT NULL REFERENCES categoria(id_categoria),
    id_equipo1 INT NOT NULL REFERENCES equipo(id_equipo),
    id_equipo2 INT NOT NULL REFERENCES equipo(id_equipo),
    fecha TIMESTAMP,
    cancha VARCHAR(100),
    estado VARCHAR(20),
    resultado1 INT,
    resultado2 INT,
    observaciones VARCHAR(300)
);

CREATE INDEX idx_fixture_categoria ON fixture(id_categoria);
CREATE INDEX idx_fixture_torneo ON fixture(id_torneo);

CREATE TABLE gol (
    id_fixture INT NOT NULL REFERENCES fixture(id_fixture),
    id_jugador INT NOT NULL REFERENCES jugador(id_jugador),
    minuto INT NOT NULL,
    tipo VARCHAR(45),
    PRIMARY KEY (id_fixture, id_jugador, minuto)
);

CREATE TABLE tarjeta (
    id_fixture INT NOT NULL REFERENCES fixture(id_fixture),
    id_jugador INT NOT NULL REFERENCES jugador(id_jugador),
    minuto INT NOT NULL,
    tipo VARCHAR(45),
    PRIMARY KEY (id_fixture, id_jugador, minuto)
);

CREATE TABLE pago_jugador (
    id_pago SERIAL PRIMARY KEY,
    id_responsable INT NOT NULL REFERENCES responsable(id_responsable),
    id_inscripcion INT NOT NULL REFERENCES inscripcion(id_inscripcion),
    fecha DATE,
    lugar VARCHAR(100),
    recibo VARCHAR(50),
    monto DECIMAL(10,2)
);

CREATE INDEX idx_pago_jugador_responsable ON pago_jugador(id_responsable);
CREATE INDEX idx_pago_jugador_inscripcion ON pago_jugador(id_inscripcion);

CREATE TABLE pago_equipo (
    id_pago SERIAL PRIMARY KEY,
    id_responsable INT NOT NULL REFERENCES responsable(id_responsable),
    id_equipo INT NOT NULL REFERENCES equipo(id_equipo),
    fecha DATE,
    lugar VARCHAR(100),
    recibo VARCHAR(50),
    monto DECIMAL(10,2)
);

CREATE INDEX idx_pago_equipo_resp ON pago_equipo(id_responsable);
CREATE INDEX idx_pago_equipo_eq   ON pago_equipo(id_equipo);

CREATE TABLE sponsor (
    id_sponsor SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion VARCHAR(255),
    url_logo VARCHAR(255),
    link_pagina VARCHAR(255),
    orden INT,
    principal BOOLEAN DEFAULT FALSE
);

CREATE TABLE sponsor_categoria (
    id SERIAL PRIMARY KEY,
    id_sponsor INT NOT NULL REFERENCES sponsor(id_sponsor),
    id_categoria INT NOT NULL REFERENCES categoria(id_categoria),
    principal BOOLEAN DEFAULT FALSE,
    orden INT,
    UNIQUE(id_sponsor, id_categoria)
);

CREATE TABLE categoria_config (
    id SERIAL PRIMARY KEY,
    id_categoria INT NOT NULL REFERENCES categoria(id_categoria),
    jugadores SMALLINT DEFAULT 0,
    equipos SMALLINT DEFAULT 0,
    fixtures SMALLINT DEFAULT 0,
    posiciones SMALLINT DEFAULT 0,
    texto TEXT,
    reglamento VARCHAR(255) DEFAULT 'empty',
    ver_jugadores SMALLINT DEFAULT 0
);

CREATE TABLE texto (
    id SERIAL PRIMARY KEY,
    clave VARCHAR(100) UNIQUE,
    contenido TEXT
);

CREATE TABLE configuracion (
    clave VARCHAR(100) PRIMARY KEY,
    valor VARCHAR(255)
);

CREATE TABLE tabla_posicion (
    id_posicion SERIAL PRIMARY KEY,
    id_torneo INT NOT NULL REFERENCES torneo(id_torneo),
    id_categoria INT NOT NULL REFERENCES categoria(id_categoria),
    id_equipo INT NOT NULL REFERENCES equipo(id_equipo),
    zona VARCHAR(20) NOT NULL,
    pj INT DEFAULT 0,
    g INT DEFAULT 0,
    e INT DEFAULT 0,
    p INT DEFAULT 0,
    gf INT DEFAULT 0,
    gc INT DEFAULT 0,
    dif INT DEFAULT 0,
    pts INT DEFAULT 0,
    fecha_calculo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(id_torneo, id_categoria, zona, id_equipo)
);

CREATE INDEX idx_tabla_pos ON tabla_posicion(id_torneo, id_categoria, zona);
