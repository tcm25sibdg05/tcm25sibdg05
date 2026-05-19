# SQL (DDL & DML)

## DDL

```sql
CREATE DATABASE IF NOT EXISTS vetpet;
USE `vetpet`;

DROP TABLE IF EXISTS `Registo_Tratamento`;
DROP TABLE IF EXISTS `Consulta`;
DROP TABLE IF EXISTS `Acao_Medica`;
DROP TABLE IF EXISTS `Veterinario`;
DROP TABLE IF EXISTS `Animal`;
DROP TABLE IF EXISTS `Cliente`;

CREATE TABLE IF NOT EXISTS `Cliente` (
    `id_cliente` INT AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(100) NOT NULL,
    `nif` VARCHAR(9) UNIQUE NOT NULL,
    `telefone` VARCHAR(15) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `morada` VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `Animal` (
    `id_animal` INT AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(100) NOT NULL,
    `especie` VARCHAR(50) NOT NULL,
    `raca` VARCHAR(50),
    `ano_nascimento` YEAR NOT NULL,
    `sexo` VARCHAR(10) NOT NULL,
    `estado_saude` ENUM('Saudável', 'Obeso', 'Problemas Digestivos') NOT NULL DEFAULT 'Saudável',
    `id_cliente` INT NOT NULL,
    FOREIGN KEY (`id_cliente`) REFERENCES `Cliente`(`id_cliente`)
);

CREATE TABLE IF NOT EXISTS `Veterinario` (
    `id_veterinario` INT AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(100) NOT NULL,
    `especialidade` VARCHAR(100) NOT NULL,
    `contacto` VARCHAR(15) NOT NULL
);

CREATE TABLE IF NOT EXISTS `Acao_Medica` (
    `id_acao` INT AUTO_INCREMENT PRIMARY KEY,
    `preco` DECIMAL(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS `Consulta` (
    `id_consulta` INT AUTO_INCREMENT PRIMARY KEY,
    `estado_consulta` ENUM('Agendada', 'Em_Curso', 'Concluída', 'Cancelada') NOT NULL DEFAULT 'Agendada',
    `data_consulta` DATE NOT NULL,
    `hora_consulta` TIME NOT NULL,
    `id_animal` INT NOT NULL,
    `id_veterinario` INT NOT NULL,
    FOREIGN KEY (`id_animal`) REFERENCES `Animal`(`id_animal`),
    FOREIGN KEY (`id_veterinario`) REFERENCES `Veterinario`(`id_veterinario`)
);

CREATE TABLE IF NOT EXISTS `Registo_Tratamento` (
    `id_registo` INT AUTO_INCREMENT PRIMARY KEY,
    `notas_clinicas` TEXT,
    `id_animal` INT NOT NULL,
    `id_acao` INT NOT NULL,
    `id_consulta` INT NOT NULL,
    FOREIGN KEY (`id_animal`) REFERENCES `Animal`(`id_animal`),
    FOREIGN KEY (`id_acao`) REFERENCES `Acao_Medica`(`id_acao`),
    FOREIGN KEY (`id_consulta`) REFERENCES `Consulta`(`id_consulta`)
);

```

---

## DML

### Inserts (exemplos)

```sql

INSERT INTO Cliente (nome, nif, telefone, email, morada) VALUES 
('Margarida Sousa', '234567890', '912345678', 'margarida.sousa@mail.com', 'Rua Central, 123, Maia'),
('Rui Pedro', '214567891', '913456789', 'ruipedro@mail.com', 'Avenida Visconde de Barreiros, Maia'),
('Ana Silva', '224567892', '914567890', 'ana.silva@mail.com', 'Rua de Altino Coelho, Maia'),
('Carlos Martins', '234567893', '915678901', 'carlos.m@mail.com', 'Travessa do Souto, Castêlo da Maia'),
('Sofia Costa', '244567894', '916789012', 'scosta@mail.com', 'Rua Dom Júlio Tavares Rebimbas, Maia'),
('Tiago Oliveira', '254567895', '917890123', 'tiago.o@mail.com', 'Rua Augusto Simões, Maia'),
('Beatriz Mendes', '264567896', '918901234', 'bia.mendes@mail.com', 'Avenida Dom Mendo, Castêlo da Maia'),
('João Rodrigues', '274567897', '919012345', 'jrodrigues@mail.com', 'Rua da Estação, Ermesinde'),
('Catarina Lima', '284567898', '921234567', 'catlima@mail.com', 'Rua de São Romão, Coronado'),
('Miguel Pereira', '294567899', '922345678', 'miguel.p@mail.com', 'Avenida António Santos Leite, Maia'),
('Inês Santos', '204567800', '923456789', 'ines.santos@mail.com', 'Rua Nova da Telheira, Maia'),
('Diogo Ferreira', '214567801', '924567890', 'diogo.f@mail.com', 'Rua Doutor Carlos Pires, Castêlo da Maia'),
('Joana Ribeiro', '224567802', '925678901', 'jribeiro@mail.com', 'Rua Eng. Duarte Pacheco, Maia'),
('Pedro Almeida', '234567803', '926789012', 'pedro.almeida@mail.com', 'Rua D. Afonso Henriques, Águas Santas'),
('Mariana Fernandes','244567804', '927890123', 'mariana.f@mail.com', 'Rua de Guedes, Maia'),
('Bruno Castro', '254567805', '928901234', 'bcastro@mail.com', 'Avenida 5 de Outubro, Porto'),
('Andreia Lopes', '264567806', '931234567', 'andreia.l@mail.com', 'Rua das Guardeiras, Maia'),
('Tomás Gomes', '274567807', '932345678', 'tomas.g@mail.com', 'Rua do Progresso, Maia'),
('Carolina Pinto', '284567808', '933456789', 'carol.pinto@mail.com', 'Rua de Vermoim, Maia'),
('Filipe Neves', '294567809', '934567890', 'fneves@mail.com', 'Rua da Agra, Maia'),
('Laura Cardoso', '204567810', '935678901', 'laura.c@mail.com', 'Rua de Catassol, Maia'),
('Hugo Teixeira', '214567811', '936789012', 'hugo.t@mail.com', 'Rua do Mosteiro, Águas Santas'),
('Marta Pires', '224567812', '937890123', 'marta.pires@mail.com', 'Avenida da Boavista, Porto'),
('Ricardo Matos', '234567813', '938901234', 'rmatos@mail.com', 'Rua Professor Doutor Carlos Lloyd Braga, Maia'),
('Diana Machado', '244567814', '961234567', 'diana.m@mail.com', 'Rua D. Fernando, Maia'),
('Nuno Carvalho', '254567815', '962345678', 'ncarvalho@mail.com', 'Rua de Vilar, Trofa'),
('Cláudia Soares', '264567816', '963456789', 'claudia.s@mail.com', 'Rua Padre Américo, Maia'),
('Gonçalo Rocha', '274567817', '964567890', 'goncalo.rocha@mail.com', 'Rua de Manhente, Castêlo da Maia'),
('Rita Marques', '284567818', '965678901', 'rita.marques@mail.com', 'Rua Henrique Medina, Maia'),
('Tiago Correia', '294567819', '966789012', 'tiago.correia@mail.com', 'Largo da Igreja, Maia');

INSERT INTO Animal (nome, especie, raca, ano_nascimento, sexo, estado_saude, id_cliente) VALUES 
('Bobby', 'Cão', 'Labrador', 2019, 'M', 'Obeso', 1),
('Luna', 'Gato', 'Siamês', 2021, 'F', 'Saudável', 2),
('Max', 'Cão', 'Pastor Alemão', 2018, 'M', 'Problemas Digestivos', 3),
('Mimi', 'Gato', 'Persa', 2020, 'F', 'Saudável', 4),
('Thor', 'Cão', 'Bulldog', 2022, 'M', 'Obeso', 5),
('Nina', 'Gato', 'Comum Europeu', 2017, 'F', 'Problemas Digestivos', 6),
('Rex', 'Cão', 'Beagle', 2021, 'M', 'Saudável', 7),
('Simba', 'Gato', 'Maine Coon', 2019, 'M', 'Saudável', 8),
('Kira', 'Cão', 'Husky', 2023, 'F', 'Saudável', 9),
('Tobias', 'Gato', 'Comum Europeu', 2015, 'M', 'Problemas Digestivos', 10),
('Mel', 'Cão', 'Pug', 2020, 'F', 'Obeso', 11),
('Zeca', 'Coelho', 'Anão', 2022, 'M', 'Saudável', 12),
('Bella', 'Cão', 'Caniche', 2016, 'F', 'Problemas Digestivos', 13),
('Frajola', 'Gato', 'Tuxedo', 2021, 'M', 'Saudável', 14),
('Rocky', 'Cão', 'Boxer', 2018, 'M', 'Saudável', 15),
('Lola', 'Cão', 'Chihuahua', 2022, 'F', 'Saudável', 16),
('Garfield', 'Gato', 'Exótico', 2019, 'M', 'Obeso', 17),
('Duke', 'Cão', 'Golden Retriever', 2020, 'M', 'Saudável', 18),
('Chloe', 'Gato', 'Sphynx', 2023, 'F', 'Saudável', 19),
('Bolinha', 'Hamster', 'Sírio', 2023, 'F', 'Saudável', 20),
('Zeus', 'Cão', 'Rottweiler', 2017, 'M','Saudável', 21);

INSERT INTO Veterinario (nome, especialidade, contacto) VALUES 
('Dr. João Almeida', 'Nutrição Veterinária', '933445566'),
('Dra. Sara Mendes', 'Cirurgia Geral', '911223344'),
('Dr. Tiago Faria', 'Medicina Interna', '966778899'),
('Dra. Beatriz Costa', 'Dermatologia', '922334455'),
('Dr. Carlos Silva', 'Animais Exóticos', '933887766');

INSERT INTO Consulta (estado_consulta, data_consulta, hora_consulta, id_animal, id_veterinario) VALUES 
('Concluída', '2026-05-02', '10:30:00', 1, 1),
('Concluída', '2026-05-03', '11:00:00', 2, 3),
('Concluída', '2026-05-04', '14:30:00', 3, 3),
('Concluída', '2026-05-05', '09:00:00', 4, 4),
('Concluída', '2026-05-06', '16:00:00', 5, 1),
('Concluída', '2026-05-07', '10:00:00', 6, 3),
('Cancelada', '2026-05-08', '11:30:00', 7, 2),
('Concluída', '2026-05-09', '15:00:00', 8, 3),
('Concluída', '2026-05-10', '09:30:00', 9, 4),
('Concluída', '2026-05-11', '14:00:00', 10, 3),
('Concluída', '2026-05-12', '16:30:00', 11, 1),
('Concluída', '2026-05-13', '10:30:00', 12, 5),
('Concluída', '2026-05-14', '11:00:00', 13, 2),
('Cancelada', '2026-05-15', '09:00:00', 14, 4),
('Concluída', '2026-05-16', '15:30:00', 15, 3),
('Concluída', '2026-05-17', '17:00:00', 16, 2),
('Concluída', '2026-05-18', '10:00:00', 17, 1),
('Em_Curso', '2026-05-19', '14:30:00', 18, 3),
('Agendada', '2026-05-20', '09:30:00', 19, 4),
('Agendada', '2026-05-20', '11:00:00', 20, 5),
('Concluída', '2026-05-01', '14:00:00', 21, 3),
('Concluída', '2026-05-02', '16:30:00', 22, 1),
('Concluída', '2026-05-03', '09:00:00', 23, 2),
('Agendada', '2026-05-21', '10:30:00', 24, 5),
('Agendada', '2026-05-21', '15:00:00', 25, 4),
('Agendada', '2026-05-22', '11:30:00', 26, 3),
('Agendada', '2026-05-22', '16:00:00', 27, 2),
('Concluída', '2026-05-05', '14:30:00', 28, 3),
('Concluída', '2026-05-06', '09:30:00', 29, 5),
('Cancelada', '2026-05-07', '17:00:00', 30, 1);

INSERT INTO Registo_Tratamento (notas_clinicas, id_animal, id_acao, id_consulta) VALUES 
('Animal apresenta excesso de peso. Recomendada ração light e início de plano de emagrecimento.', 1, 2, 1),
('Administração da vacina anual concluída sem reações adversas.', 1, 3, 1),
('Check-up de rotina. Olhos e ouvidos limpos.', 2, 1, 2),
('Apresenta diarreia aguda há 2 dias. Prescrito probiótico.', 3, 1, 3),
('Desparasitação interna e externa.', 4, 1, 4),
('Ajuste da dieta prescrita anteriormente. Baixou 1kg.', 5, 2, 5),
('Suspeita de gastrite. Alteração para ração gastrointestinal.', 6, 1, 6),
('Vacinação de reforço anual. Tudo normal.', 8, 3, 8),
('Problema de pele localizado. Recomendado champô específico.', 9, 1, 9),
('Vómitos recorrentes. Realizada ecografia (sem alterações).', 10, 1, 10),
('Prescrito aumento de exercício diário e corte nos snacks.', 11, 2, 11),
('Corte de unhas e verificação dentária.', 12, 1, 12),
('Avaliação de dor abdominal. Medicado com anti-inflamatório.', 13, 1, 13),
('Consulta de rotina anual. Vacinas em dia.', 15, 1, 15),
('Limpeza de ouvidos preventiva.', 16, 1, 16),
('Excesso de peso detetado. Início de plano de controlo calórico.', 17, 2, 17),
('Avaliação geral - animal bastante ativo e saudável.', 21, 1, 21),
('Gengivite severa. Agendamento de destartarização futuro.', 22, 1, 22),
('Reforço de vacinação.', 23, 3, 23),
('Animal prostrado, perda de apetite. Análises pedidas.', 28, 1, 28),
('Ajuste na quantidade de feno e granulado devido a ganho de peso.', 29, 2, 29),
('Vacinação da raiva efetuada.', 2, 3, 2),
('Consulta de seguimento. Melhoria visível na digestão.', 3, 1, 3),
('Corte de unhas e desparasitação profilática.', 5, 1, 5),
('Avaliação de nódulo subcutâneo.', 8, 1, 8),
('Reforço vacinal anual.', 10, 3, 10),
('Apresentou tosse. Prescrito xarope para 5 dias.', 11, 1, 11),
('Consulta dermatológica de controlo.', 15, 1, 15),
('Vacinação obrigatória administrada.', 17, 3, 17),
('Avaliação de claudicação membro posterior direito.', 21, 1, 21);
```

### Consultas (exemplos)

```sql

SELECT c.hora_consulta, a.nome AS paciente, cl.nome AS dono, v.nome AS medico, c.estado_consulta
FROM Consulta c
JOIN Animal a ON c.id_animal = a.id_animal
JOIN Cliente cl ON a.id_cliente = cl.id_cliente
JOIN Veterinario v ON c.id_veterinario = v.id_veterinario
WHERE c.data_consulta = '2026-05-20' AND c.estado_consulta = 'Agendada'
ORDER BY c.hora_consulta ASC;

SELECT rt.notas_clinicas, am.descricao AS tratamento, am.preco, c.data_consulta
FROM Registo_Tratamento rt
JOIN Acao_Medica am ON rt.id_acao = am.id_acao
JOIN Consulta c ON rt.id_consulta = c.id_consulta
WHERE rt.id_animal = 1
ORDER BY c.data_consulta DESC;

SELECT a.nome AS animal, a.estado_saude, cl.nome AS dono, cl.telefone
FROM Animal a
JOIN Cliente cl ON a.id_cliente = cl.id_cliente
WHERE a.estado_saude IN ('Obeso', 'Problemas Digestivos');

```
