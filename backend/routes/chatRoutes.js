import express from 'express';

import {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} from '../controllers/chatControllers.js';
import { isAuth } from '../utils.js';
const router = express.Router();

router.route('/').post(isAuth, accessChat);
router.route('/').get(isAuth, fetchChats);
router.route('/group').post(isAuth, createGroupChat);
router.route('/rename').put(isAuth, renameGroup);
router.route('/groupremove').put(isAuth, removeFromGroup);
router.route('/groupadd').put(isAuth, addToGroup);

export default router;
