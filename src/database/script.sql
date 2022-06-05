CREATE DATABASE ps2;
USE ps2;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nomeUsuario VARCHAR(45) NOT NULL,
    apelidoUsuario VARCHAR(45),
	email VARCHAR(45) UNIQUE NOT NULL,
	senha VARCHAR(45) NOT NULL,
    fkJogo INT,
    FOREIGN KEY (fkJogo) REFERENCES jogo(idJogo)
);

CREATE TABLE jogo (
	idJogo INT PRIMARY KEY AUTO_INCREMENT,
	nomeJogo VARCHAR(70) NOT NULL
); 

SELECT * FROM usuario;
SELECT * FROM jogo;

INSERT INTO jogo VALUES
	(null, 'Ben 10 Protector of Earth'),
	(null, 'Shrek Super Slam'),
	(null, 'Madagascar'),
	(null, 'God of War'),
	(null, 'Mafia');

INSERT INTO usuario (nomeUsuario, email, senha, fkJogo) VALUES
	('Amanda', 'amanda@gmail.com', '#Teste11', 3),
	('Bianca', 'bianca@gmail.com', '#Teste11', 1),
	('Carlos', 'carlos@gmail.com', '#Teste11', 2),
	('David', 'david@gmail.com', '#Teste11', 5),
	('Cintia', 'cintia@gmail.com', '#Teste11', 4),
	('Elisa', 'elisa@gmail.com', '#Teste11', 1),
	('Pedro', 'pedro@gmail.com', '#Teste11', 1),
	('Matheus', 'matheus@gmail.com', '#Teste11', 4),
	('Gabriel', 'gabriel@gmail.com', '#Teste11', 5),
	('Lucas', 'lucas@gmail.com', '#Teste11', 2),
	('Roger', 'roger@gmail.com', '#Teste11', 1),
	('Danilo', 'danilo@gmail.com', '#Teste11', 3),
	('Geraldo', 'geraldo@gmail.com', '#Teste11', 5),
	('Paulo', 'paulo@gmail.com', '#Teste11', 2),
	('Marcos', 'marcos@gmail.com', '#Teste11', 4),
	('Ana', 'ana@gmail.com', '#Teste11', 1),
	('Ramon', 'ramon@gmail.com', '#Teste11', 3),
	('Nathalia', 'nathalia@gmail.com', '#Teste11', 2),
	('Bruno', 'bruno@gmail.com', '#Teste11', 5),
	('Julio', 'julio@gmail.com', '#Teste11', 4),
	('Fabio', 'fabio@gmail.com', '#Teste11', 1),
	('Alan', 'alan@gmail.com', '#Teste11', 5),
	('Rodrigo', 'rodrigo@gmail.com', '#Teste11', 5),
	('Alessandra', 'alessandra@gmail.com', '#Teste11', 1);

SELECT count(fkJogo) AS 'Total de Votos' FROM usuario;

SELECT j.nomeJogo AS 'Jogo', count(u.fkJogo) AS 'Votos'
FROM jogo AS j
JOIN usuario AS u ON u.fkJogo = j.idJogo
GROUP BY u.fkJogo
ORDER BY count(fkJogo) DESC;