-- Creación de la tabla Usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    correo_electronico VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(100) NOT NULL,
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Creación de la tabla Categorias
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- Creación de la tabla Publicaciones
CREATE TABLE publicaciones (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha_publicacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    titulo VARCHAR(100) NOT NULL,
    imagen TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    id_categoria INT NOT NULL,
    precio INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id)
);

-- Creación de la tabla Comentarios
CREATE TABLE comentarios (
    id SERIAL PRIMARY KEY,
    contenido TEXT NOT NULL,
    id_usuario INT NOT NULL,
    id_publicacion INT NOT NULL,
    fecha_comentario TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_publicacion) REFERENCES publicaciones(id)
);
