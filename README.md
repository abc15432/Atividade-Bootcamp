# PWA CLIMA CEUB - JONATHAN OLIVEIRA RODRIGUES

Este projeto é um PWA (Progressive Web App) que exibe a previsão do tempo, implementado em uma arquitetura de Monorepo (Web/API).

## 1. Arquitetura do Projeto

O projeto é dividido em dois módulos principais, seguindo a estrutura de Monorepo:
* **`apps/web` (Frontend/PWA):** Construído com HTML, CSS e JavaScript. É responsável pela interface, caching offline via Service Worker, e instalabilidade via Manifest. Consome dados do Backend.
* **`apps/api` (Backend/API Gateway):** Construído com Node.js e Express.js. Atua como um Gateway que recebe requisições do Frontend e as encaminha para a API externa (OpenWeatherMap), garantindo a segurança da chave de API.

## 2. Entrega e Acesso

| Item de Entrega | Status | Link |
| :--- | :--- | :--- |
| **Repositório (Monorepo)** | ✅ Concluído | https://github.com/abc15432/Atividade-Bootcamp |
| **PWA Publicado** | ✅ Concluído | https://abc15432.github.io/Atividade-Bootcamp/ |
| **Run do CI/CD** | ✅ Concluído | https://github.com/abc15432/Atividade-Bootcamp/actions/runs/19306264297 |

## 3. Endpoints da API (Backend)

O backend em Node.js expõe os seguintes endpoints, conforme a lógica em `apps/api/index.js`:

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Verifica a saúde do servidor. |
| `GET` | `/api/weather/:city` | Retorna os dados de clima para a cidade especificada, usando a chave da API (OpenWeatherMap). |

## 4. Containers, Testes e CI/CD (Justificativa de Bloqueios)

O desenvolvimento foi afetado por severas restrições de segurança e políticas do PC institucional, que **impediram a instalação e execução dos requisitos de Containers, Testes e CI/CD**:

* A execução de scripts do **Node.js/NPM** foi desativada, impedindo o `npm install` e o `npm start` (ver logs em anexo).
* A instalação de ferramentas como **Docker** e **Playwright** (para testes E2E) foi bloqueada, inviabilizando a orquestração com **Docker Compose**.
* O código para estas etapas (Dockerfiles, Compose, e lógica de testes) foi estruturado corretamente no repositório, mas não pôde ser validado com execução.

---

## 5. Como Rodar com Docker Compose (Lógica)

A lógica de *build* e *deploy* com Compose seria a seguinte (assumindo um ambiente desbloqueado):

```yaml
version: '3.8'
services:
  api:
    build: ./apps/api
    ports:
      - "3000:3000"
    env_file: ./apps/api/.env
  web:
    build: ./apps/web
    ports:
      - "80:80"
