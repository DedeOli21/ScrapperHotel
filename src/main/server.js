// src/main/Server.js (VERSÃO FINAL)

require('dotenv').config();
const App = require('./app'); // 1. Importa a CLASSE App
const container = require('./container'); // 2. Importa o container JÁ EXECUTADO (singleton)
const createRoutes = require('../infra/http/routes'); // 3. Importa a função de criar rotas

const port = process.env.PORT || 8080;

const startServer = async () => {
  try {
    const { logger, browserService, searchController } = container;

    await browserService.initialize();
    logger.info('Browser service initialized successfully.');

    const router = createRoutes(searchController);
    
    const app = new App({ router });

    const server = app.server.listen(port, () => {
      logger.info(`Server listening on port ${port}`);
    });

    const gracefulShutdown = () => {
      logger.info('Received shutdown signal, closing resources...');
      server.close(async () => {
        await browserService.close();
        logger.info('Browser closed. Exiting process.');
        process.exit(0);
      });
    };

    process.on('SIGINT', gracefulShutdown);
    process.on('SIGTERM', gracefulShutdown);

  } catch (error) {
    logger.error({ err: error }, 'Failed to start the application');
    process.exit(1);
  }
};

startServer();