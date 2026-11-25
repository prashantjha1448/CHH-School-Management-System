const express = require('express');
const router = express.Router();
const {
  getConversations,
  getOrCreateConversation,
  sendMessage,
  getMessages,
} = require('../controller/chat.controller');
const { verifyJWT } = require('../middleware/auth.middleware');
const upload = require('../middleware/multer.middleware');

// All chat routes require authentication
router.use(verifyJWT);

// Conversations
router.route('/conversations')
  .get(getConversations)
  .post(getOrCreateConversation);

// Messages in a conversation
router.route('/conversations/:conversationId/messages')
  .get(getMessages)
  .post(upload.single('attachment'), sendMessage);

module.exports = router;
