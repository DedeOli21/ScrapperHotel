const express = require('express');
const router = express.Router();

function createRoutes(searchController) {
  router.post('/search', (req, res) => searchController.handle(req, res));

  return router;
}

module.exports = createRoutes;