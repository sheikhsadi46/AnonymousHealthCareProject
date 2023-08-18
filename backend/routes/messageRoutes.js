import express from 'express';
import { allMessages, sendMessage } from '../controllers/MessageController.js';
import { isAuth } from '../utils.js';
const router = express.Router();

router.post('/', isAuth, sendMessage);

router.get('/:chatId', isAuth, allMessages);

export default router;
