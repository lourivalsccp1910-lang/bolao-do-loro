# PROJECT.md
# Bolão do Loro

## Status do Projeto

**Nome:** Bolão do Loro

**Versão atual:** 0.3 (Fundação)

**Status:** Em desenvolvimento

**Tipo de projeto:**
Sistema Web para administração profissional de bolões de futebol.

---

# Missão

Construir um sistema profissional para administrar bolões de futebol, eliminando processos manuais realizados atualmente em planilhas Excel e WhatsApp.

O sistema deverá ser simples para o usuário, porém extremamente organizado internamente, permitindo crescimento por muitos anos.

---

# Objetivos

O sistema deverá permitir:

- Cadastro de participantes
- Cadastro de campeonatos
- Cadastro de jogos
- Cadastro de equipes
- Cadastro de palpites
- Ranking automático
- Controle financeiro
- Histórico completo
- Administração de vários bolões simultaneamente
- Integração futura com APIs esportivas
- Integração futura com WhatsApp
- Sistema responsivo (Desktop e Mobile)

---

# Princípios do Projeto

## 1. Organização

Código limpo.

Sem duplicação.

Arquitetura escalável.

---

## 2. Estabilidade

Nunca atualizar versões sem necessidade.

Sempre trabalhar sobre uma base estável.

---

## 3. Simplicidade

O usuário final não é programador.

A interface deve ser intuitiva.

---

## 4. Escalabilidade

Toda funcionalidade nova deverá poder crescer sem necessidade de reconstruir o projeto.

---

# Ambiente Oficial

## Node

22.23.1

## React

19.2.8

## React DOM

19.2.8

## Vite

5.4.19

## Plugin React

4.3.4

## TypeScript

6.0.2

Estas versões estão congeladas.

Nenhuma atualização deverá ser feita sem necessidade.

---

# Arquitetura Oficial

src/

assets/

components/

common/

layout/

ui/

hooks/

layouts/

modules/

dashboard/

participantes/

campeonatos/

jogos/

palpites/

ranking/

financeiro/

pages/

services/

styles/

types/

utils/

App.tsx

main.tsx

---

# Organização por módulos

Cada módulo deverá possuir sua própria estrutura.

Exemplo:

modules/

dashboard/

DashboardPage.tsx

DashboardCard.tsx

DashboardService.ts

DashboardTypes.ts

index.ts

---

# Bibliotecas oficiais

React Router

Material UI

React Hook Form

Zod

Axios

TanStack Query

React Icons

---

# Fluxo de Desenvolvimento

Cada Sprint deverá seguir obrigatoriamente:

Planejamento

Arquitetura

Implementação

Teste

Validação

Commit

Push

Nenhuma Sprint será considerada concluída apenas porque o código foi escrito.

Ela somente será concluída quando o sistema estiver funcionando.

---

# Estrutura das Releases

Cada Release deverá conter:

Objetivo

Arquivos alterados

Arquivos novos

Checklist

Resultado esperado

Commit sugerido

---

# Regras do Projeto

Nunca reconstruir uma parte já estabilizada.

Nunca improvisar código.

Sempre revisar imports.

Sempre revisar exports.

Sempre manter compatibilidade entre arquivos.

Sempre priorizar estabilidade.

---

# Responsabilidades

## Usuário

Validar regras do bolão.

Informar necessidades.

Testar o sistema.

Reportar erros.

---

## Arquiteto do Software

Definir arquitetura.

Projetar módulos.

Garantir compatibilidade.

Planejar Sprints.

Produzir código.

Reduzir retrabalho.

---

# Objetivo da Release 0.3

Construir a fundação definitiva do sistema.

Ao final da Release deverá existir:

✔ Dashboard

✔ Header

✔ Sidebar

✔ Layout Responsivo

✔ Estrutura definitiva

✔ Navegação

✔ Base para todas as próximas versões

---

# Visão de Longo Prazo

Versão 1.0

Sistema totalmente operacional.

Versão 2.0

Aplicativo Mobile.

Versão 3.0

Integração completa com APIs esportivas.

Versão 4.0

Integração financeira.

Versão 5.0

Sistema SaaS para múltiplos organizadores de bolões.

---

# Filosofia

O Bolão do Loro não é um projeto de estudos.

É um software real.

Todas as decisões deverão priorizar:

- estabilidade
- organização
- simplicidade
- evolução contínua

Este documento é a Constituição do Projeto.

Toda alteração estrutural deverá respeitar estas diretrizes.