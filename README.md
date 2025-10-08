Desafio Asksuite - Web Scraper de Quartos de Hotel
Este projeto consiste em uma API Node.js cuja principal função é realizar web scraping em um site de reservas de hotel. A aplicação busca por quartos disponíveis com base em datas de check-in e check-out fornecidas pelo usuário.

O projeto foi desenvolvido seguindo os princípios da Arquitetura Limpa e SOLID, garantindo um código desacoplado, testável e de fácil manutenção.

Estrutura do Projeto
A arquitetura do projeto é dividida em camadas, cada uma com uma responsabilidade clara, garantindo a separação de conceitos e o fluxo de dependência correto (de fora para dentro).

domain: A camada mais interna da aplicação. Contém as entidades de negócio puras (como Room), objetos de valor (DateRange) e erros de domínio. Esta camada não tem conhecimento sobre o restante da aplicação.

application: Contém a lógica de negócio específica da aplicação, orquestrada através de Casos de Uso (Use Cases). Ela define as interfaces (contratos) que a camada de infraestrutura deve implementar.

infrastructure: A camada mais externa, responsável por todos os detalhes técnicos e interação com o mundo exterior. Aqui ficam as implementações de serviços externos (como o scraper com Puppeteer), controllers da API, rotas, e configurações do servidor.

main: A raiz da composição. É o ponto de entrada da aplicação, responsável por instanciar e conectar ("injetar") todas as dependências das outras camadas.


Principais Ferramentas
Ferramenta	Descrição
Node.js	Ambiente de execução para o JavaScript no servidor.
Express.js	Framework web minimalista para a criação da API e gerenciamento de rotas.
Puppeteer	Biblioteca para automação e controle de navegadores headless (Chromium), utilizada para a extração dos dados do site (web scraping).
Jest	Framework de testes para garantir a qualidade e o funcionamento correto da lógica de negócio e dos componentes da aplicação.
ESLint	Ferramenta para análise estática de código que ajuda a encontrar e corrigir problemas de padronização e potenciais bugs.
Husky & lint-staged	Ferramentas que automatizam a verificação de qualidade do código (lint e testes) antes de cada commit, garantindo a integridade do repositório.
Docker	Plataforma de contêineres utilizada para criar um ambiente padronizado e portátil para a aplicação, facilitando a execução em qualquer máquina.
Dotenv	Módulo para carregar variáveis de ambiente a partir de um arquivo .env, mantendo as configurações sensíveis fora do código.
Pino	Logger de alta performance para registrar eventos e erros da aplicação de forma estruturada.


Claro! Aqui está uma documentação completa no formato README.md para o seu projeto, detalhando as ferramentas e a estrutura de alto nível, como solicitado.

Desafio Asksuite - Web Scraper de Quartos de Hotel
Este projeto consiste em uma API Node.js cuja principal função é realizar web scraping em um site de reservas de hotel. A aplicação busca por quartos disponíveis com base em datas de check-in e check-out fornecidas pelo usuário.

O projeto foi desenvolvido seguindo os princípios da Arquitetura Limpa e SOLID, garantindo um código desacoplado, testável e de fácil manutenção.

Estrutura do Projeto
A arquitetura do projeto é dividida em camadas, cada uma com uma responsabilidade clara, garantindo a separação de conceitos e o fluxo de dependência correto (de fora para dentro).

domain: A camada mais interna da aplicação. Contém as entidades de negócio puras (como Room), objetos de valor (DateRange) e erros de domínio. Esta camada não tem conhecimento sobre o restante da aplicação.

application: Contém a lógica de negócio específica da aplicação, orquestrada através de Casos de Uso (Use Cases). Ela define as interfaces (contratos) que a camada de infraestrutura deve implementar.

infrastructure: A camada mais externa, responsável por todos os detalhes técnicos e interação com o mundo exterior. Aqui ficam as implementações de serviços externos (como o scraper com Puppeteer), controllers da API, rotas, e configurações do servidor.

main: A raiz da composição. É o ponto de entrada da aplicação, responsável por instanciar e conectar ("injetar") todas as dependências das outras camadas.

Principais Ferramentas
Ferramenta	Descrição
Node.js	Ambiente de execução para o JavaScript no servidor.
Express.js	Framework web minimalista para a criação da API e gerenciamento de rotas.
Puppeteer	Biblioteca para automação e controle de navegadores headless (Chromium), utilizada para a extração dos dados do site (web scraping).
Jest	Framework de testes para garantir a qualidade e o funcionamento correto da lógica de negócio e dos componentes da aplicação.
ESLint	Ferramenta para análise estática de código que ajuda a encontrar e corrigir problemas de padronização e potenciais bugs.
Husky & lint-staged	Ferramentas que automatizam a verificação de qualidade do código (lint e testes) antes de cada commit, garantindo a integridade do repositório.
Docker	Plataforma de contêineres utilizada para criar um ambiente padronizado e portátil para a aplicação, facilitando a execução em qualquer máquina.
Dotenv	Módulo para carregar variáveis de ambiente a partir de um arquivo .env, mantendo as configurações sensíveis fora do código.
Pino	Logger de alta performance para registrar eventos e erros da aplicação de forma estruturada.

Pré-requisitos
Para executar este projeto, você precisará ter as seguintes ferramentas instaladas:

Node.js (versão 20 ou superior)

Docker e Docker Compose

Claro! Aqui está uma documentação completa no formato README.md para o seu projeto, detalhando as ferramentas e a estrutura de alto nível, como solicitado.

Desafio Asksuite - Web Scraper de Quartos de Hotel
Este projeto consiste em uma API Node.js cuja principal função é realizar web scraping em um site de reservas de hotel. A aplicação busca por quartos disponíveis com base em datas de check-in e check-out fornecidas pelo usuário.

O projeto foi desenvolvido seguindo os princípios da Arquitetura Limpa e SOLID, garantindo um código desacoplado, testável e de fácil manutenção.

Estrutura do Projeto
A arquitetura do projeto é dividida em camadas, cada uma com uma responsabilidade clara, garantindo a separação de conceitos e o fluxo de dependência correto (de fora para dentro).

domain: A camada mais interna da aplicação. Contém as entidades de negócio puras (como Room), objetos de valor (DateRange) e erros de domínio. Esta camada não tem conhecimento sobre o restante da aplicação.

application: Contém a lógica de negócio específica da aplicação, orquestrada através de Casos de Uso (Use Cases). Ela define as interfaces (contratos) que a camada de infraestrutura deve implementar.

infrastructure: A camada mais externa, responsável por todos os detalhes técnicos e interação com o mundo exterior. Aqui ficam as implementações de serviços externos (como o scraper com Puppeteer), controllers da API, rotas, e configurações do servidor.

main: A raiz da composição. É o ponto de entrada da aplicação, responsável por instanciar e conectar ("injetar") todas as dependências das outras camadas.

Principais Ferramentas
Ferramenta	Descrição
Node.js	Ambiente de execução para o JavaScript no servidor.
Express.js	Framework web minimalista para a criação da API e gerenciamento de rotas.
Puppeteer	Biblioteca para automação e controle de navegadores headless (Chromium), utilizada para a extração dos dados do site (web scraping).
Jest	Framework de testes para garantir a qualidade e o funcionamento correto da lógica de negócio e dos componentes da aplicação.
ESLint	Ferramenta para análise estática de código que ajuda a encontrar e corrigir problemas de padronização e potenciais bugs.
Husky & lint-staged	Ferramentas que automatizam a verificação de qualidade do código (lint e testes) antes de cada commit, garantindo a integridade do repositório.
Docker	Plataforma de contêineres utilizada para criar um ambiente padronizado e portátil para a aplicação, facilitando a execução em qualquer máquina.
Dotenv	Módulo para carregar variáveis de ambiente a partir de um arquivo .env, mantendo as configurações sensíveis fora do código.
Pino	Logger de alta performance para registrar eventos e erros da aplicação de forma estruturada.

Exportar para as Planilhas
Pré-requisitos
Para executar este projeto, você precisará ter as seguintes ferramentas instaladas:

Node.js (versão 20 ou superior)

Docker e Docker Compose

Instalação e Execução
Você pode rodar o projeto de duas maneiras:

1. Com Docker (Recomendado)
Este método é o mais simples, pois o Docker gerencia todo o ambiente e as dependências para você.

Bash

# 1. Clone o repositório
git clone <url-do-repositorio>

# 2. Navegue até a pasta do projeto
cd asksuite-test

# 3. Construa a imagem e inicie o contêiner
docker-compose up --build
A aplicação estará rodando em http://localhost:8080.

2. Localmente
Bash

# 1. Clone o repositório
git clone <url-do-repositorio>

# 2. Navegue até a pasta do projeto
cd asksuite-test

# 3. Instale as dependências
npm install

# 4. Crie o arquivo de variáveis de ambiente
cp .env.example .env

# 5. Inicie o servidor em modo de desenvolvimento
npm run dev
A aplicação estará rodando em http://localhost:8080.


Claro! Aqui está uma documentação completa no formato README.md para o seu projeto, detalhando as ferramentas e a estrutura de alto nível, como solicitado.

Desafio Asksuite - Web Scraper de Quartos de Hotel
Este projeto consiste em uma API Node.js cuja principal função é realizar web scraping em um site de reservas de hotel. A aplicação busca por quartos disponíveis com base em datas de check-in e check-out fornecidas pelo usuário.

O projeto foi desenvolvido seguindo os princípios da Arquitetura Limpa e SOLID, garantindo um código desacoplado, testável e de fácil manutenção.

Estrutura do Projeto
A arquitetura do projeto é dividida em camadas, cada uma com uma responsabilidade clara, garantindo a separação de conceitos e o fluxo de dependência correto (de fora para dentro).

domain: A camada mais interna da aplicação. Contém as entidades de negócio puras (como Room), objetos de valor (DateRange) e erros de domínio. Esta camada não tem conhecimento sobre o restante da aplicação.

application: Contém a lógica de negócio específica da aplicação, orquestrada através de Casos de Uso (Use Cases). Ela define as interfaces (contratos) que a camada de infraestrutura deve implementar.

infrastructure: A camada mais externa, responsável por todos os detalhes técnicos e interação com o mundo exterior. Aqui ficam as implementações de serviços externos (como o scraper com Puppeteer), controllers da API, rotas, e configurações do servidor.

main: A raiz da composição. É o ponto de entrada da aplicação, responsável por instanciar e conectar ("injetar") todas as dependências das outras camadas.

Principais Ferramentas
Ferramenta	Descrição
Node.js	Ambiente de execução para o JavaScript no servidor.
Express.js	Framework web minimalista para a criação da API e gerenciamento de rotas.
Puppeteer	Biblioteca para automação e controle de navegadores headless (Chromium), utilizada para a extração dos dados do site (web scraping).
Jest	Framework de testes para garantir a qualidade e o funcionamento correto da lógica de negócio e dos componentes da aplicação.
ESLint	Ferramenta para análise estática de código que ajuda a encontrar e corrigir problemas de padronização e potenciais bugs.
Husky & lint-staged	Ferramentas que automatizam a verificação de qualidade do código (lint e testes) antes de cada commit, garantindo a integridade do repositório.
Docker	Plataforma de contêineres utilizada para criar um ambiente padronizado e portátil para a aplicação, facilitando a execução em qualquer máquina.
Dotenv	Módulo para carregar variáveis de ambiente a partir de um arquivo .env, mantendo as configurações sensíveis fora do código.
Pino	Logger de alta performance para registrar eventos e erros da aplicação de forma estruturada.

Exportar para as Planilhas
Pré-requisitos
Para executar este projeto, você precisará ter as seguintes ferramentas instaladas:

Node.js (versão 20 ou superior)

Docker e Docker Compose

Instalação e Execução
Você pode rodar o projeto de duas maneiras:

1. Com Docker (Recomendado)
Este método é o mais simples, pois o Docker gerencia todo o ambiente e as dependências para você.

Bash

# 1. Clone o repositório
git clone <url-do-repositorio>

# 2. Navegue até a pasta do projeto
cd asksuite-test

# 3. Construa a imagem e inicie o contêiner
docker-compose up --build
A aplicação estará rodando em http://localhost:8080.

2. Localmente
Bash

# 1. Clone o repositório
git clone <url-do-repositorio>

# 2. Navegue até a pasta do projeto
cd asksuite-test

# 3. Instale as dependências
npm install

# 4. Crie o arquivo de variáveis de ambiente
cp .env.example .env

# 5. Inicie o servidor em modo de desenvolvimento
npm run dev
A aplicação estará rodando em http://localhost:8080.

-- Scripts Disponíveis
npm start: Inicia a aplicação em modo de produção.

npm run dev: Inicia a aplicação em modo de desenvolvimento com nodemon, que reinicia o servidor automaticamente a cada alteração no código.

npm test: Executa a suíte de testes completa uma vez.

npm run test:watch: Executa os testes em modo "watch", rodando novamente a cada alteração nos arquivos.

npm run test:coverage: Executa os testes e gera um relatório de cobertura de código.




