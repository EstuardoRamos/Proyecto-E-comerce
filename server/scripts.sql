CREATE TABLE usuario (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  dinero_real DECIMAL(10,2) NOT NULL,
  moneda_virtual DECIMAL(10,2) NOT NULL,
  rol VARCHAR(255) NOT NULL,
  estado VARCHAR(255) NOT NULL
);

CREATE TABLE producto (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  precio_moneda DECIMAL(10,2) NOT NULL,
  precio_dinero_real DECIMAL(10,2) NOT NULL,
  categoria VARCHAR(255) NOT NULL,
  idvendedor  INT ,  
  idestado INT NOT NULL,
  imagen VARCHAR(255) NOT NULL,
  FOREIGN KEY (idvendedor) REFERENCES usuario(id),
  FOREIGN KEY (idestado) REFERENCES estadoproducto(id)
);

CREATE TABLE transacción (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tipo VARCHAR(255) NOT NULL,
  fecha DATETIME NOT NULL,
  idcomprador INT,
  idvendedor INT,
  idproducto INT,
  monto_moneda_sistema DECIMAL(10,2) ,
  monto_dinero_real DECIMAL(10,2) ,
  categoria VARCHAR(255) NOT NULL,
  FOREIGN KEY (idcomprador) REFERENCES usuario(id),
  FOREIGN KEY (idvendedor) REFERENCES usuario(id),
  FOREIGN KEY (idproducto) REFERENCES producto(id)
);
CREATE TABLE estadoproducto (
  id INT PRIMARY KEY AUTO_INCREMENT,
  estado VARCHAR(255) NOT NULL  
);
CREATE TABLE chat (
  id INT PRIMARY KEY AUTO_INCREMENT,
  contenido TEXT NOT NULL,
  fecha DATETIME NOT NULL,
  idcomprador INT,
  idvendedor INT,
  idproducto  INT,
  FOREIGN KEY (idproducto) REFERENCES producto(id),
  FOREIGN KEY (idcomprador) REFERENCES usuario(id),
  FOREIGN KEY (idvendedor) REFERENCES usuario(id)
);


---insert
INSERT INTO usuario (nombre, username, password, dinero_real, moneda_virtual, rol, estado)
VALUES ('Juan Perez', 'juanperez123', 'contraseñaSegura', 100.50, 50.00, 'Comprador', 'Activo');

INSERT INTO usuario (nombre, username, password, dinero_real, moneda_virtual, rol, estado)
VALUES ('Maria Lopez', 'marialopez789', 'claveFuerte123', 250.75, 10.00, 'Vendedor', 'Activo');


-- Suponiendo que el usuario 'juanperez123' tiene el id 1

INSERT INTO producto (nombre, descripcion, precio_moneda, precio_dinero_real, categoria, idvendedor, idestado)
VALUES ('Smartphone X', 'Último modelo con pantalla de alta resolución', 1500.00, 500.00, 'Telefonía', 1, 1);  -- idvendedor = 1 (usuario 'juanperez123')

INSERT INTO producto (nombre, descripcion, precio_moneda, precio_dinero_real, categoria, idvendedor, idestado)
VALUES ('Tenis Deportivos', 'Cómodos y ligeros para running', 200.00, 75.00, 'Deporte', 2, 1);  -- idvendedor = 2 (usuario 'marialopez789')


-- Suponiendo que el usuario 'juanperez123' tiene el id 1 (comprador) y el producto con id 2 es comprado

INSERT INTO transacción (tipo, fecha, idcomprador, idvendedor, idproducto, monto_moneda_sistema, monto_dinero_real, categoria)
VALUES ('Compra', NOW(), 1, 2, 2, 200.00, 75.00, 'Deporte');


-- Suponiendo que el usuario 'juanperez123' tiene el id 1 (comprador) y el producto con id 2 es comprado

INSERT INTO transacción (tipo, fecha, idcomprador, idvendedor, idproducto, monto_moneda_sistema, monto_dinero_real, categoria)
VALUES ('Compra', NOW(), 1, 2, 5, 200.00, 75.00, 'Deporte');

-- Suponiendo que el usuario 'juanperez123' (id 1) chatea con 'marialopez789' (id 2) sobre el producto con id 2

INSERT INTO chat (contenido, fecha, idcomprador, idvendedor, idproducto)
VALUES ('Hola, estoy interesado en tu producto Tenis Deportivos', NOW(), 1, 2, 5);
