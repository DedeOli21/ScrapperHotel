🏨 Scrapper Hotel - Desafio Asksuite
Esta é uma API RESTful desenvolvida em Node.js que realiza web scraping em um site de reservas para encontrar quartos de hotel disponíveis, com base nas datas de check-in e check-out fornecidas.

O projeto foi construído seguindo os princípios de Arquitetura Limpa e SOLID, resultando em um código modular, testável e de fácil manutenção, ideal para ambientes de produção.

✨ Features
Busca de Quartos: Endpoint para consultar disponibilidade de quartos via web scraping.

Qualidade de Código Automatizada: Hooks de pré-commit com Husky para rodar lint e testes.

Ambiente Padronizado: Configuração completa com Docker para garantir consistência entre ambientes.

Arquitetura Robusta: Separação clara de responsabilidades em camadas (domain, application, infrastructure).

🏛️ Estrutura do Projeto
A arquitetura é dividida em camadas para garantir o desacoplamento e a separação de conceitos:

domain: O coração da aplicação. Contém as entidades de negócio (Room), objetos de valor (DateRange) e erros de domínio. É totalmente independente de frameworks e detalhes externos.

application: Orquestra a lógica de negócio através de Casos de Uso (Use Cases) e define os contratos (interfaces) que a camada de infraestrutura deve seguir.

infrastructure: A camada externa. Contém as implementações de detalhes técnicos como o servidor web (Express), o serviço de scraping (Puppeteer), controllers, rotas e configurações.

main: A raiz da composição. Ponto de entrada que instancia e conecta todas as peças da aplicação através de injeção de dependência.

🛠️ Principais Ferramentas
Ferramenta	Descrição
Node.js	Ambiente de execução JavaScript no servidor.
Express.js	Framework para a criação da API e gerenciamento de rotas.
Puppeteer	Biblioteca para automação de navegadores, utilizada para o web scraping.
Jest	Framework para testes unitários e de integração.
ESLint	Ferramenta para padronização e análise estática do código.
Husky & lint-staged	Automatizam a verificação de qualidade do código antes de cada commit.
Docker	Plataforma para criar e gerenciar o ambiente da aplicação em contêineres.
Pino	Logger de alta performance para registrar eventos e erros.
Dotenv	Módulo para carregar variáveis de ambiente a partir de um arquivo .env.

Exportar para as Planilhas
🚀 Começando
Siga os passos abaixo para executar o projeto em sua máquina.

Pré-requisitos
Node.js (v20 ou superior)

Docker e Docker Compose

Instalação e Execução
1. Com Docker (Recomendado)
Este é o método mais simples e garante que o ambiente seja idêntico ao de produção.

Bash

# 1. Clone o repositório
git clone https://github.com/DedeOli21/ScrapperHotel.git

# 2. Navegue até a pasta do projeto
cd ScrapperHotel

# 3. Construa a imagem e inicie o contêiner
docker-compose up --build
A API estará disponível em http://localhost:8080.

2. Localmente
Bash

# 1. Clone o repositório e entre na pasta
git clone https://github.com/DedeOli21/ScrapperHotel.git
cd ScrapperHotel

# 2. Instale as dependências
npm install

# 3. Crie o arquivo de variáveis de ambiente
cp .env.example .env

# 4. Inicie o servidor em modo de desenvolvimento
npm run dev
A API estará disponível em http://localhost:8080.

📜 Scripts Disponíveis
npm start: Inicia a aplicação em modo de produção.

npm run dev: Inicia a aplicação com nodemon para desenvolvimento.

npm test: Executa a suíte de testes completa.

npm run test:watch: Executa os testes em modo "watch".

npm run test:coverage: Executa os testes e gera um relatório de cobertura.

⚙️ Qualidade de Código
O projeto utiliza um hook de pre-commit com Husky. Antes de cada commit, o ESLint e o Jest são executados automaticamente. Se houver erros de lint ou se algum teste falhar, o commit será bloqueado, garantindo a integridade e a qualidade do código no repositório.