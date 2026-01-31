# 📘 Documentação Inicial — Sistema de Agendamentos

## 1️⃣ Visão Geral do Sistema

Este sistema é uma **plataforma de agendamento de horários para barbearia**.

Ele permite que clientes marquem horários disponíveis, que barbeiros visualizem e gerenciem sua agenda diária, e que administradores tenham controle total do sistema.

O objetivo principal é:

* evitar conflitos de horário
* respeitar regras de funcionamento do barbeiro
* permitir cancelamentos controlados
* manter tudo simples, rápido e confiável

---

## 2️⃣ Perfis de Usuário

### 👤 USER (Cliente)

* Criar conta / fazer login
* Visualizar horários disponíveis
* Marcar horário
* Cancelar **apenas o próprio horário** (até 80 minutos antes)
* Ver histórico de agendamentos

---

### ✂️ BARBER (Barbeiro)

* Visualizar agenda **por dia**
* Ver quem agendou cada horário
* Cancelar horários (quando necessário)
* Criar exceções de atendimento (dias/horários fora do padrão)

---

### 🛠️ ADMIN

* Tudo que o BARBER pode fazer
* Gerenciar usuários
* Gerenciar barbeiros
* Acesso total ao sistema

---

## 3️⃣ Regras de Negócio Principais

* Um horário só pode ser marcado se estiver dentro do horário de atendimento do barbeiro
* Não existe confirmação manual de agendamento (fluxo direto)
* Cancelamentos só podem ocorrer até **80 minutos antes do horário**
* O barbeiro visualiza a agenda sempre **por dia**
* Horários padrão são definidos por dia da semana
* Horários excepcionais podem sobrescrever o padrão

---

## 4️⃣ Fluxo Principal de Telas

1. Login / Registro
2. Dashboard (varia conforme perfil)
3. Agenda do dia
4. Marcar horário
5. Cancelar horário
6. Perfil do usuário

---

## 5️⃣ Observação Importante

Esta documentação é **viva**.

Ela deve ser atualizada sempre que:

* uma regra mudar
* uma nova funcionalidade surgir
* um endpoint for alterado

Ela serve como referência para **front-end, back-end e manutenção futura**.
