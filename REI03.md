# Modelo Entidade-Associação

erDiagram
    CLIENTE ||--o{ ANIMAL : possui
    ANIMAL ||--o{ CONSULTA : agenda
    VETERINARIO ||--o{ CONSULTA : realiza
    ANIMAL ||--o{ REGISTO_TRATAMENTO : regista
    CONSULTA }o--|| ACAO_MEDICA : inclui
    REGISTO_TRATAMENTO }o--|| ACAO_MEDICA : documenta

    CLIENTE {
        int ID_cliente PK
        string Nome
        string NIF
        string Telefone
        string Email
        string Morada
    }

    ANIMAL {
        int ID_animal PK
        string Nome
        string Especie
        string Raca
        int Ano_Nascimento
        string Sexo
        string Estado_Saude
        int ID_Cliente FK
    }

    VETERINARIO {
        int ID_veterinario PK
        string Nome
        string Especialidade
        string Contacto
    }

    CONSULTA {
        int ID_consulta PK
        string Estado_Consulta
        date Data_Consulta
        int ID_Animal FK
        int ID_Veterinario FK
    }

    ACAO_MEDICA {
        int ID_acao PK
        string Descricao
        float Preco
    }

    REGISTO_TRATAMENTO {
        int ID_registo PK
        string Notas_Clinicas
        int ID_Animal FK
        int ID_Acao FK
        int ID_Consulta FK
    }

## Entidades e Associações

### Cliente

A entidade Cliente representa os proprietários dos animais que contratam os serviços da clínica veterinária. Cada cliente possui um identificador único (ID) e é caracterizado por atributos como Nome, Número de Identificação Fiscal (NIF), Telefone, Email e Morada. Um cliente pode possuir vários animais de estimação sob a sua responsabilidade.

### Animal

A entidade Animal representa os pacientes registados na clínica. Os atributos incluem ID, Nome, Espécie, Raça, Ano de Nascimento, Sexo e Estado de Saúde (controlado por valores fixos). Cada animal pertence exclusivamente a um único cliente (dono).

### Veterinário

A entidade Veterinário representa os profissionais do corpo clínico da instituição. Cada médico veterinário possui um ID único e atributos como Nome, Especialidade e Contacto. Um veterinário pode ser responsável pela realização de múltiplas consultas ao longo do tempo.

### Consulta

A entidade Consulta representa o atendimento médico associado a um animal e a um veterinário. Inclui ID, Data da Consulta, Estado da Consulta (utilizado para acompanhar o fluxo do atendimento) e as chaves estrangeiras que a ligam ao animal e ao médico responsável. Cada consulta refere-se a apenas um animal e a um único veterinário.

### Ação Médica (Tratamento)

A entidade Ação Médica define os tipos de procedimentos, exames ou tratamentos que a clínica disponibiliza (como vacinação, cirurgia ou limpeza de dentes). Cada ação possui um ID, uma Descrição do tipo de serviço e um Preço Fixo associado. Esta entidade serve de referência para o preenchimento do histórico clínico e cálculo de valores.

## Registo de Tratamento (Histórico)

Esta entidade funciona como a ligação intermédia entre as consultas e as ações médicas realizadas. Regista o que foi efetivamente feito ao paciente, contendo o ID do Registo, Notas Clínicas/Observações e a associação com a Consulta e a Ação Médica aplicada. É a partir deste registo que o sistema gera o valor total de faturação.
