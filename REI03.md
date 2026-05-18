# Modelo Entidade-Associação

## Entidades

**CLIENTE**
Representa os proprietários dos pacientes registados na instituição.

* **ID_Cliente** (Chave Primária)
* Nome
* NIF
* Telefone
* Email
* Morada

**ANIMAL**
Representa os pacientes clínicos alvo de acompanhamento veterinário.

* **ID_Animal** (Chave Primária)
* Nome
* Espécie
* Raça
* Ano_Nascimento
* Sexo
* Estado_Saude *(Atributo sujeito a restrição de domínio: 'Saudável', 'Obeso', 'Problemas Digestivos')*
* **ID_Cliente** (Chave Estrangeira)

**VETERINÁRIO**
Representa o corpo clínico responsável pelos atendimentos.

* **ID_Veterinario** (Chave Primária)
* Nome
* Especialidade
* Contacto

**CONSULTA**
Regista os eventos de atendimento médico agendados e efetuados.

* **ID_Consulta** (Chave Primária)
* Estado_Consulta *(Atributo sujeito a restrição de domínio: 'Agendada', 'Em_Curso', 'Concluída', 'Cancelada')*
* Data_Consulta
* Hora_Consulta
* **ID_Animal** (Chave Estrangeira)
* **ID_Veterinario** (Chave Estrangeira)

**AÇÃO_MÉDICA**
Cataloga os procedimentos clínicos e os serviços disponibilizados para efeitos de faturação e historial.

* **ID_Acao** (Chave Primária)
* Preco

**REGISTO_TRATAMENTO**
Constitui o historial clínico pormenorizado, documentando as intervenções realizadas no decurso das consultas.

* **ID_Registo** (Chave Primária)
* **ID_Animal** (Chave Estrangeira)
* **ID_Acao** (Chave Estrangeira)
* **ID_Consulta** (Chave Estrangeira)

---

## Associações e Cardinalidades

* **possui(CLIENTE, ANIMAL) (Grau 1:N)**
Estipula que um Cliente pode possuir um ou múltiplos Animais (N), ao passo que cada Animal está estritamente associado a um único Cliente (1).

* **agenda(ANIMAL,CONSULTA) (Grau 1:N)**
Determina que um Animal pode registar uma ou múltiplas Consultas (N) no sistema, sendo que cada Consulta é exclusivamente destinada a um único Animal (1).

* **realiza(VETERINÁRIO, CONSULTA) (Grau 1:N)**
Define que um Médico Veterinário pode conduzir diversas Consultas (N) ao longo do tempo. Inversamente, cada Consulta é conduzida por apenas um Médico Veterinário (1).

* **regista(ANIMAL, REGISTO_TRATAMENTO) (Grau 1:N)**
Indica que o acompanhamento clínico de um Animal pode gerar vários Registos de Tratamento (N), correspondendo cada registo unicamente a um Animal (1), garantindo assim a continuidade do historial médico.

* **inclui(CONSULTA, AÇÃO_MÉDICA) (Grau N:1)**
Estabelece que múltiplas Consultas (N) podem englobar a mesma tipologia de Ação Médica (1) presente no catálogo do sistema.

* **documenta(REGISTO_TRATAMENTO, AÇÃO_MÉDICA) (Grau N:1)**
Formaliza que distintos Registos de Tratamento (N) podem referenciar uma mesma Ação Médica (1), atestando a aplicação repetida de um dado procedimento (e.g., uma vacina anual) em diferentes momentos clínicos.
