# Introdução

## Descrição do Trabalho

O projeto consiste na especificação e desenvolvimento do sistema VetPet, uma aplicação informática dedicada à gestão integrada de uma clínica veterinária. Este sistema tem como principal objetivo melhorar a organização interna da clínica e otimizar de forma significativa os seus processos de registo, agendamento e gestão global de serviços. O desenvolvimento desta solução planeia permitir a automatização de tarefas diárias, reduzindo drasticamente a possibilidade de ocorrência de erros humanos e proporcionando, assim, um controlo bastante mais eficiente sobre os atendimentos, consultas e tratamentos realizados. A implementação do sistema não só beneficiará o funcionamento operacional da clínica, mas também melhorará a experiência geral dos clientes ao garantir uma assistência mais ágil, segura e estruturada aos seus animais de estimação.

Uma clínica veterinária enfrenta desafios operacionais significativos na gestão diária de clientes, pacientes e respetivos históricos clínicos. Atualmente, muitas clínicas ainda utilizam processos manuais ou sistemas de informação fragmentados, o que dificulta o acompanhamento contínuo e eficaz do percurso médico dos animais, podendo levar a confusões administrativas ou à perda de dados clínicos vitais. Cada cliente (proprietário) pode possuir vários animais de estimação sob a sua responsabilidade, e cada animal pode requerer múltiplos serviços, exames e tratamentos ao longo do tempo. Esta realidade torna complexo o acompanhamento cronológico do histórico médico e a gestão eficiente dos agendamentos sem uma ferramenta devidamente centralizada.

Para otimizar a gestão e mitigar estas falhas, torna-se necessário o desenvolvimento de um sistema de gestão que permita registar e organizar toda a informação de forma eficiente, simples e segura, melhorando a comunicação interna e o fluxo de trabalho da própria clínica. O sistema VetPet incluirá funcionalidades completas para o cadastro de clientes, onde serão armazenados dados essenciais de contacto e faturação, tais como o nome, o número de identificação fiscal (NIF), o telefone, o e-mail e a morada. Adicionalmente, o cadastro de animais abrangerá informações detalhadas para a sua correta identificação e rastreio, incluindo o nome do animal, a espécie, a raça, o ano de nascimento, o sexo e a associação direta ao seu respetivo dono.

O sistema também permitirá gerir de forma rigorosa as consultas e o corpo clínico da instituição. Será possível registar os médicos veterinários com as respetivas especialidades e contactos, facilitando a marcação de consultas que associam, em simultâneo, um animal a um profissional disponível. Para garantir a consistência dos dados e evitar erros de inserção por parte dos utilizadores, o estado das consultas será estritamente controlado através de um campo com valores pré-definidos (Agendada, Em_Curso, Concluída, Cancelada), impedindo entradas inválidas. Adicionalmente, para facilitar a operação diária da receção, será implementada uma vista (View) específica que apresenta automaticamente as consultas do dia, exibindo de forma limpa o nome do animal, o nome do dono e a hora do atendimento.

Com este sistema informatizado, será disponibilizado um histórico clínico detalhado por animal, onde ficarão registadas todas as intervenções médicas, medicações prescritas e observações clínicas efetuadas ao longo do tempo. O sistema oferecerá ainda relatórios estruturados por veterinário, contribuindo para uma melhor monitorização da produtividade e organização interna. Embora o sistema VetPet não seja diretamente acessível aos clientes, os mesmos beneficiarão indiretamente da sua implementação através da redução de erros nos processos e de um atendimento médico mais preciso. O sistema será de uso exclusivo da equipa administrativa e dos médicos veterinários, permitindo um foco total nas necessidades operacionais e na integridade de toda a informação guardada.

## Modelação do Problema

Para a modelação do problema, foram assumidos os seguintes pressupostos:

* Cada cliente pode possuir múltiplos animais de estimação.
* Um animal pertence exclusivamente a um único cliente (dono).
* Cada animal pode ter várias consultas e tratamentos associados ao longo do tempo.
* Os veterinários são registados com as suas respetivas especialidades e dados de contacto.
* As consultas são associadas obrigatoriamente a um único animal e a um único veterinário.
* O estado da consulta é controlado estritamente por regras de domínio através de opções fixas (Agendada, Em_Curso, Concluída, Cancelada).
* A equipa da receção dispõe de uma vista específica para listar as consultas do dia corrente, mostrando o nome do animal, o dono e a hora.
* O sistema permite gerar relatórios de atividade e produtividade organizados por cada médico veterinário.
* É possível registar e consultar um histórico clínico detalhado por animal, contendo intervenções, medicações e observações clínicas.
* O sistema deverá garantir a integridade dos dados, impedindo o registo de consultas ou tratamentos para animais que não constem na base de dados.
