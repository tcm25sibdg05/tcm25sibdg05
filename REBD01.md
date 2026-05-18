# Esquema Relacional

## Tabelas

### Cliente

Regista os proprietários dos animais, incluindo os seus dados de contacto e faturação.

| Nome | Descrição | Domínio | Por Omissão | Automático | Nulo |
| --- | --- | --- | --- | --- | --- |
| id_cliente | Identificador do cliente | INT, PRIMARY KEY, AUTO_INCREMENT | - | Sim | Não |
| nome | Nome do cliente | VARCHAR(100) NOT NULL | - | Não | Não |
| nif | Número de Id. Fiscal | VARCHAR(9) UNIQUE NOT NULL | - | Não | Não |
| telefone | Número de telefone | VARCHAR(15) NOT NULL | - | Não | Não |
| email | Email de contacto | VARCHAR(100) NOT NULL | - | Não | Não |
| morada | Morada de residência | VARCHAR(255) NOT NULL | - | Não | Não |

---

### Animal

Contém os animais (pacientes) registados na clínica, associados a um cliente (dono).

| Nome | Descrição | Domínio | Por Omissão | Automático | Nulo |
| --- | --- | --- | --- | --- | --- |
| id_animal | Identificador do animal | INT, PRIMARY KEY, AUTO_INCREMENT | - | Sim | Não |
| nome | Nome do animal | VARCHAR(100) NOT NULL | - | Não | Não |
| especie | Espécie (Cão, Gato, etc.) | VARCHAR(50) NOT NULL | - | Não | Não |
| raca | Raça do animal | VARCHAR(50) | - | Não | Sim |
| ano_nascimento | Ano de nascimento | YEAR NOT NULL | - | Não | Não |
| sexo | Género do animal | VARCHAR(10) NOT NULL | - | Não | Não |
| estado_saude | Condição física atual | ENUM('Saudável', 'Obeso', 'Problemas Digestivos') | 'Saudável' | Não | Não |
| id_cliente | Referência ao dono (cliente) | INT, FOREIGN KEY → Cliente(id_cliente) NOT NULL | - | Não | Não |

---

### Veterinário

Regista o corpo clínico responsável pela realização das consultas.

| Nome | Descrição | Domínio | Por Omissão | Automático | Nulo |
| --- | --- | --- | --- | --- | --- |
| id_veterinario | Identificador do médico | INT, PRIMARY KEY, AUTO_INCREMENT | - | Sim | Não |
| nome | Nome do veterinário | VARCHAR(100) NOT NULL | - | Não | Não |
| especialidade | Área de especialização | VARCHAR(100) NOT NULL | - | Não | Não |
| contacto | Telefone de contacto | VARCHAR(15) NOT NULL | - | Não | Não |

---

### Consulta

Marcações de atendimento clínico efetuadas para os animais.

| Nome | Descrição | Domínio | Por Omissão | Automático | Nulo |
| --- | --- | --- | --- | --- | --- |
| id_consulta | Identificador da marcação | INT, PRIMARY KEY, AUTO_INCREMENT | - | Sim | Não |
| estado_consulta | Fase atual do atendimento | ENUM('Agendada', 'Em_Curso', 'Concluída', 'Cancelada') NOT NULL | 'Agendada' | Não | Não |
| data_consulta | Data da marcação | DATE NOT NULL | CURRENT_DATE () | Não | Não |
| hora_consulta | Hora da marcação | TIME NOT NULL | CURRENT_TIME () | Não | Não |
| id_animal | Animal a ser consultado | INT, FOREIGN KEY → Animal(id_animal) NOT NULL | - | Não | Não |
| id_veterinario | Médico responsável | INT, FOREIGN KEY → Veterinario(id_veterinario) NOT NULL | - | Não | Não |

---

### Ação_Médica

Catálogo de serviços, tratamentos ou exames disponíveis na clínica.

| Nome | Descrição | Domínio | Por Omissão | Automático | Nulo |
| --- | --- | --- | --- | --- | --- |
| id_acao | Identificador do tratamento | INT, PRIMARY KEY, AUTO_INCREMENT | - | Sim | Não |
| preco | Preço base da ação | DECIMAL(10,2) NOT NULL | - | Não | Não |

---

### Registo_Tratamento

Histórico detalhado de tudo o que foi realizado clinicamente a um animal.

| Nome | Descrição | Domínio | Por Omissão | Automático | Nulo |
| --- | --- | --- | --- | --- | --- |
| id_registo | Identificador do histórico | INT, PRIMARY KEY, AUTO_INCREMENT | - | Sim | Não |
| notas_clinicas | Observações do médico | TEXT | - | Não | Sim |
| id_animal | Animal intervencionado | INT, FOREIGN KEY → Animal(id_animal) NOT NULL | - | Não | Não |
| id_acao | Procedimento médico aplicado | INT, FOREIGN KEY → Acao_Medica(id_acao) NOT NULL | - | Não | Não |
| id_consulta | Consulta de origem do tratamento | INT, FOREIGN KEY → Consulta(id_consulta) NOT NULL | - | Não | Não |

---

## Vistas SQL (Views)

### RelatorioConsultasDoDia

Mostra automaticamente os dados essenciais para a receção gerir a agenda do dia atual.

```sql
CREATE VIEW RelatorioConsultasDoDia AS
SELECT 
    c.id_consulta,
    c.hora_consulta,
    c.estado_consulta,
    a.nome AS nome_animal,
    cl.nome AS nome_dono,
    v.nome AS nome_veterinario
FROM Consulta c
JOIN Animal a ON c.id_animal = a.id_animal
JOIN Cliente cl ON a.id_cliente = cl.id_cliente
JOIN Veterinario v ON c.id_veterinario = v.id_veterinario
WHERE c.data_consulta = CURDATE();

```

### Vista_Historico_Animal

Consulta do historial clínico completo de um animal, exibindo os procedimentos aplicados, as notas médicas e a data em que ocorreram.

```sql
CREATE VIEW Vista_Historico_Animal AS
SELECT
    a.nome AS nome_animal,
    am.descricao AS acao_realizada,
    rt.notas_clinicas,
    c.data_consulta,
    c.estado_consulta
FROM Registo_Tratamento rt
JOIN Animal a ON rt.id_animal = a.id_animal
JOIN Acao_Medica am ON rt.id_acao = am.id_acao
JOIN Consulta c ON rt.id_consulta = c.id_consulta
ORDER BY c.data_consulta DESC;

```
