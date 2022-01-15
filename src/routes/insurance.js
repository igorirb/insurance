const express = require('express');
const { insurance, middleware } = require('../validators');

const router = express.Router();

const controller = require('../controllers/insurance');

/**
 * @swagger
 * /insurance:
 *   post:
 *     description: Insurance POST endpoint
 *     requestBody:
 *      description: Optional description in *Markdown*
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Insurance'
 *     responses:
 *       200:
 *         description: Returns the risk profile.
 *
 * components:
 *   schemas:
 *     Insurance:
 *       type: object
 *       properties:
 *         age:
 *           type: integer
 *         dependents:
 *           type: integer
 *         house:
 *           type: object
 *           properties:
 *             ownership_status:
 *               type: string
 *         income:
 *           type: integer
 *         marital_status:
 *           type: string
 *         risk_questions:
 *           type: array
 *           items:
 *             type: integer
 *         vehicle:
 *           type: object
 *           properties:
 *             year:
 *               type: integer
 */
router.post('/', middleware(insurance.post), controller.post);

module.exports = router;
