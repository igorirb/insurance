const express = require('express');

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     description: Welcome to the home page!
 *     responses:
 *       200:
 *         description: Returns a string.
 */
router.get('/', (req, res) => {
  res.status(200).send({
    title: 'Node Express API',
    version: '0.0.1',
  });
});

module.exports = router;
