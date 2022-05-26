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
	nomeJogo VARCHAR(70) NOT NULL,
    sinopse VARCHAR(500) NOT NULL,
	qtdVotos INT
); 

SELECT * FROM usuario;
SELECT * FROM jogo;

INSERT INTO jogo VALUES
	(null, 'Ben 10 Protector of Earth', 'O enredo
	trata das aventuras de um garoto chamado Ben
	Tennyson, sua prima Gwen e o avô Max. Após
	manter contato com forças extraterrestres,
	Ben recebeu o poder de se mutar, tomando
	diversas formas alienígenas.', 0),
	(null, 'Shrek Super Slam', 'A fórmula é o bom
	e velho duelo um-contra-um. Até quatro jogadores
	podem competir simultaneamente com vinte
	personagens - incluindo Shrek, o Burro, Princesa
	Fiona, Gato-de-Botas, Príncipe Encantado, entre
	outros, cada um com suas armas e golpes
	especiais.', 0),
	(null, 'Madagascar', 'A história do jogo gira em
	torno de quatro animais: Alex, Marty, Melman e
	Gloria. Depois de seu aniversário, Marty sente que
	sua vida no zoológico de Central Park é sempre a
	mesma coisa e decide voltar para a natureza. Com a
	ajuda de quatro pinguins, a zebra escapa e então
	se inicia a trama.', 0),
	(null, 'God of War', 'Baseada em distintas mitologias,
	a história segue Kratos, um guerreiro espartano que
	foi levado a matar sua família por seu antigo mestre,
	o deus da guerra Ares. Isso desencadeia uma série de
	eventos que levam à guerras com os panteões
	mitológicos.', 0),
	(null, 'Mafia', 'Tommy Angelo, um taxista de Lost
	Heaven, estava na hora e no lugar errado. Uma dupla
	de gângsteres em meio a uma fuga se deparam com
	todos os pneus furados e prestes a serem baleados
	por seus rivais. Sendo o único carro no meio da rua
	naquela hora, Tommy recebe uma oferta que ele não
	pode recusar.', 0);