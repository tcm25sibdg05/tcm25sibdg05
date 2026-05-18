# SQL (DDL & DML)

## DDL

```sql
CREATE DATABASE IF NOT EXISTS vetpet;
USE `vetpet`;

-- Eliminar tabelas caso existam (ordem inversa à criação para evitar erros de Foreign Keys)
DROP TABLE IF EXISTS `Registo_Tratamento`;
DROP TABLE IF EXISTS `Consulta`;
DROP TABLE IF EXISTS `Acao_Medica`;
DROP TABLE IF EXISTS `Veterinario`;
DROP TABLE IF EXISTS `Animal`;
DROP TABLE IF EXISTS `Cliente`;

-- Tabela Cliente
CREATE TABLE IF NOT EXISTS `Cliente` (
    `id_cliente` INT AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(100) NOT NULL,
    `nif` VARCHAR(9) UNIQUE NOT NULL,
    `telefone` VARCHAR(15) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `morada` VARCHAR(255) NOT NULL
);

-- Tabela Animal
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

-- Tabela Veterinário
CREATE TABLE IF NOT EXISTS `Veterinario` (
    `id_veterinario` INT AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(100) NOT NULL,
    `especialidade` VARCHAR(100) NOT NULL,
    `contacto` VARCHAR(15) NOT NULL
);

-- Tabela Ação Médica (Catálogo de Serviços)
CREATE TABLE IF NOT EXISTS `Acao_Medica` (
    `id_acao` INT AUTO_INCREMENT PRIMARY KEY,
    `preco` DECIMAL(10,2) NOT NULL
);

-- Tabela Consulta
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

-- Tabela Registo de Tratamento (Histórico)
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
-- Inserir Clientes
INSERT INTO Cliente (nome, nif, telefone, email, morada)
VALUES ('Margarida Sousa', '234567890', '912345678', 'margarida.sousa@mail.com', 'Rua Central, 123, Maia');

-- Inserir Animais
INSERT INTO Animal (nome, especie, raca, ano_nascimento, sexo, estado_saude, id_cliente)
VALUES ('Bobby', 'Cão', 'Labrador', 2019, 'M', 'Obeso', 1);

-- Inserir Veterinários
INSERT INTO Veterinario (nome, especialidade, contacto)
VALUES ('Dr. João Almeida', 'Nutrição Veterinária', '933445566');

-- Inserir Consultas
INSERT INTO Consulta (estado_consulta, data_consulta, hora_consulta, id_animal, id_veterinario)
VALUES ('Concluída', '2026-05-20', '10:30:00', 1, 1);

-- Inserir Registos de Tratamento (Histórico da consulta)
INSERT INTO Registo_Tratamento (notas_clinicas, id_animal, id_acao, id_consulta)
VALUES ('Animal apresenta excesso de peso. Recomendada ração light e início de plano de emagrecimento.', 1, 2, 1),
       ('Administração da vacina anual concluída sem reações adversas.', 1, 3, 1);

```

### Consultas (exemplos)

```sql
-- Ver as consultas agendadas para uma determinada data (útil para a receção)
SELECT c.hora_consulta, a.nome AS paciente, cl.nome AS dono, v.nome AS medico, c.estado_consulta
FROM Consulta c
JOIN Animal a ON c.id_animal = a.id_animal
JOIN Cliente cl ON a.id_cliente = cl.id_cliente
JOIN Veterinario v ON c.id_veterinario = v.id_veterinario
WHERE c.data_consulta = '2026-05-20' AND c.estado_consulta = 'Agendada'
ORDER BY c.hora_consulta ASC;

-- Ver o histórico clínico completo de um animal específico (ex: ID = 1)
SELECT rt.notas_clinicas, am.descricao AS tratamento, am.preco, c.data_consulta
FROM Registo_Tratamento rt
JOIN Acao_Medica am ON rt.id_acao = am.id_acao
JOIN Consulta c ON rt.id_consulta = c.id_consulta
WHERE rt.id_animal = 1
ORDER BY c.data_consulta DESC;

-- Ver todos os animais que precisam de atenção especial (não saudáveis) e os contactos dos donos
SELECT a.nome AS animal, a.estado_saude, cl.nome AS dono, cl.telefone
FROM Animal a
JOIN Cliente cl ON a.id_cliente = cl.id_cliente
WHERE a.estado_saude IN ('Obeso', 'Problemas Digestivos');

```
