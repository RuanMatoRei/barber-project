## 📱 Fluxo de Telas — Sistema de Agendamento

### 🎯 Objetivo

Definir o fluxo de navegação do sistema para cada tipo de usuário, sem considerar layout ou design visual.

---

## 👥 Perfis do sistema

* **USER** → cliente
* **BARBER** → barbeiro
* **ADMIN** → administrador do sistema

---

## 🔐 1. Fluxo de Autenticação

### Telas:

* `/login`
* `/register`

### Regras:

* Usuário não autenticado só acessa login e cadastro
* Após login:

  * USER → Dashboard do usuário
  * BARBER → Agenda do barbeiro
  * ADMIN → Dashboard administrativo

---

## 🧑‍💼 2. Fluxo do Usuário (Cliente)

### Telas principais:

#### 🏠 Dashboard

* Próximos agendamentos
* Acesso rápido para:

  * Marcar horário
  * Cancelar horário
  * Perfil

---

#### 📅 Marcar Horário

Fluxo:

1. Escolher barbeiro
2. Escolher serviço
3. Escolher data
4. Escolher horário disponível
5. Confirmar agendamento

Regras:

* Horários indisponíveis não podem ser selecionados
* Não é necessária confirmação do barbeiro
* Agendamento entra como **SCHEDULED**

---

#### ❌ Cancelar Agendamento

* Usuário pode cancelar **somente seus próprios agendamentos**
* Cancelamento permitido até **80 minutos antes**
* Status muda para **CANCELED**

---

#### 👤 Perfil

* Visualizar dados pessoais
* Editar dados básicos
* Visualizar histórico de agendamentos

---

## ✂️ 3. Fluxo do Barbeiro

### Telas principais:

#### 📆 Agenda

* Visualização por dia
* Lista de horários agendados
* Identificação de:

  * Cliente
  * Serviço
  * Horário
  * Status

---

#### ❌ Cancelamento (Barbeiro)

* Barbeiro pode cancelar agendamentos do dia
* Cancelamento muda status para **CANCELED**

---

#### ⚙️ Configuração de Agenda

* Definir dias de atendimento
* Definir horários fixos
* Criar exceções (folgas / horários especiais)

---

## 🛠️ 4. Fluxo do Administrador

### Telas principais:

#### 📊 Dashboard Admin

* Visão geral do sistema
* Total de usuários
* Total de barbeiros
* Total de agendamentos

---

#### 👥 Gerenciamento de Usuários

* Criar
* Editar
* Ativar / Desativar

---

#### ✂️ Gerenciamento de Barbeiros

* Criar
* Editar
* Definir serviços disponíveis

---

#### 🧾 Gerenciamento de Serviços

* Criar
* Editar
* Ativar / Desativar

---

## 🔒 Regras Globais de Navegação

* Rotas protegidas por autenticação
* Rotas protegidas por perfil
* Logout invalida token
* Token expirado → redireciona para `/login`

---

## ✅ Status do Agendamento

| Status    | Descrição                      |
| --------- | ------------------------------ |
| SCHEDULED | Agendado normalmente           |
| CANCELED  | Cancelado por usuário/barbeiro |

---

## 🧠 Observações Importantes

* Front-end **não decide regras críticas**
* Todas as validações finais vêm do backend
* Front reflete estados retornados pela API

---

## ✅ O que você acabou de ganhar

Com esse documento, você já sabe:

✔️ quais páginas existirão
✔️ quais rotas criar
✔️ quais stores serão necessárias
✔️ onde entram guards de rota
✔️ como dividir módulos no Nuxt

