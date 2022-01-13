/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The article's title.
 *           example: Benefits of programming
 *         author:
 *           type: string
 *           description: Author of the article.
 *           example: Sam
 *         content:
 *           type: string
 *           description: Content of the article.
 *           example: Programming improves critical thinking.
 */

import express from 'express';
import { authenticateToken } from '../middleware/verifyJWT.js'
import { 
    getArticlesHandler, 
    getSpecificArticleHandler,
    postArticleHandler,
    patchArticleHandler,
    deleteArticleHandler 
    } from '../controllers/articleController.js'

const router = express.Router()

//Get Method

/**
 * @swagger
 * /articles:
 *   get:
 *     description: Retrieve a list of Articles. * 
 *     responses:
 *       200:
 *         description: A list of articles.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Article'
 */

router.get('/', getArticlesHandler)

//Get a single object

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     description: Retrieve a single article.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the article to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single article.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Article'
 */
router.get('/:id', getSpecificArticleHandler)

//Post an article

/**
 * @swagger
 * /users:
 *   post:
 *     description: Create a JSONPlaceholder user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               $ref: '#/components/schemas/Article'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Article'
*/

router.post('/', authenticateToken, postArticleHandler)

//Patch Method

/**
 * @swagger
 * /articles/{id}:
 *   patch:
 *     description: Edit an single article.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the article to retrieve.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *       200:
 *         description: Edit an article.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Article'
*/

router.patch("/:id", authenticateToken, patchArticleHandler)

// Delete an article

/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     description: Delete an article.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the article to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Delete one article.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Article'
*/

router.delete("/:id", authenticateToken, deleteArticleHandler)

export default router;