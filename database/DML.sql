insert into usuarios (nombre, correo_electronico, contrasena) values ('test', 'test@test.com', '$2a$10$3QJNQ5CtiAaHITVCIOqKYuaokTIqARtocWp3.3w5Z3gsnigyfaq1W');
insert into usuarios (nombre, correo_electronico, contrasena) values ('ia5ap', 'ia5ap@test.com', '$2a$10$J2TCHXFBd0.4GIgbbzG3l.H48TMDlV47Lbvhms1k/MvFMclZFVIFS');

insert into categorias (nombre) values ('Tecnología');
insert into categorias (nombre) values ('Hogar');
insert into categorias (nombre) values ('Vehículos');
insert into categorias (nombre) values ('Deportes');
insert into publicaciones (id_usuario, titulo, descripcion, id_categoria, imagen, precio) values (1, 'Laptop HP 15s-eq1023la', 'Laptop HP 15s-eq1023la, 15.6", AMD Ryzen 5 4500U, 8GB RAM, 256GB SSD, Windows 10 Home', 1, 'https://http2.mlstatic.com/D_NQ_NP_2X_732841-MLC71646608420_092023-F.webp', 500000);

insert into comentarios(contenido, id_usuario, id_publicacion) values ('Excelente producto', 1, 1) 

/* CREATE TABLE publicaciones (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha_publicacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    id_categoria INT NOT NULL,
    imagen TEXT NOT NULL,
    precio INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id),
    FOREIGN KEY (id_categoria) REFERENCES Categorias(id)
); */


/* {
      "id": 1,
      "id_usuario": 45,
      "fecha_publicacion": "2023-11-25T10:00:00Z",
      "titulo": "Laptop HP 15s-eq1023la",
      "descripcion": "Laptop HP 15s-eq1023la, 15.6\", AMD Ryzen 5 4500U, 8GB RAM, 256GB SSD, Windows 10 Home",
      "id_categoria": 3,
      "precio": 500000,
      "imagen": "https://http2.mlstatic.com/D_NQ_NP_2X_732841-MLC71646608420_092023-F.webp",
      "comentarios": [
        {
          "id": 101,
          "contenido": "Lindo note.",
          "id_usuario": 789,
          "id_publicacion": 1,
          "fecha_comentario": "2023-11-25T11:30:00Z"
        }
      ]
    } 
*/

