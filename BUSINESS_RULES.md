# BUSINESS_RULES.md

# Bolão do Loro

## Manual Oficial de Regras de Negócio

Este documento contém todas as regras de funcionamento do sistema.

Toda implementação deverá seguir estas regras.

---

# Objetivo

O sistema deve permitir administrar diversos tipos de bolões de futebol de forma automática, segura e organizada.

---

# Tipos de Bolão

O sistema deverá suportar:

- Bolão de Placar
- Bolão Tipo Loteca
- Bolão Mata-Mata
- Bolão Personalizado

Cada modalidade poderá possuir regras próprias.

---

# Cadastro de Participantes

Cada participante deverá possuir:

- Nome
- Telefone
- Cidade
- Status (Ativo/Inativo)
- Observações

No futuro poderá existir:

- CPF
- E-mail
- Foto

---

# Campeonatos

Um campeonato poderá possuir:

- Nome
- Temporada
- Data de início
- Data de encerramento
- Status

Exemplos:

- Brasileirão Série A
- Copa do Brasil
- Libertadores
- Sul-Americana
- Copa do Mundo
- Mundial de Clubes

---

# Jogos

Cada jogo deverá possuir:

- Rodada
- Data
- Hora
- Mandante
- Visitante
- Placar oficial
- Situação

---

# Palpites

Cada participante poderá registrar um palpite para cada jogo.

O sistema deverá impedir alterações após o encerramento da rodada.

---

# Pontuação

O sistema deverá permitir configurar a pontuação.

Exemplos:

- Acerto exato
- Acerto parcial
- Acerto vencedor
- Acerto classificação

A pontuação deverá ser parametrizável.

---

# Ranking

O ranking deverá ser atualizado automaticamente.

Critérios de desempate deverão ser configuráveis.

Exemplos:

- Maior número de placares exatos
- Maior número de acertos parciais
- Ordem de envio

---

# Financeiro

Cada participante poderá possuir:

- Valor devido
- Valor recebido
- Situação financeira

O sistema deverá emitir relatórios.

---

# Histórico

Nenhuma informação deverá ser perdida.

Toda alteração importante deverá permanecer registrada.

---

# Configurações

O administrador poderá configurar:

- Pontuação
- Critérios de desempate
- Valores das apostas
- Premiações
- Datas limite

---

# Escalabilidade

O sistema deverá permitir administrar diversos bolões simultaneamente.

Exemplo:

Brasileirão

Libertadores

Copa do Brasil

Mundial

Todos independentes.

---

# Futuro

O sistema deverá permitir:

- Integração com APIs esportivas
- Integração com WhatsApp
- Aplicativo Mobile
- Múltiplos administradores
- Relatórios avançados

---

# Princípios

As regras de negócio sempre terão prioridade sobre a implementação técnica.

A tecnologia deve se adaptar ao Bolão do Loro.

Nunca o contrário.