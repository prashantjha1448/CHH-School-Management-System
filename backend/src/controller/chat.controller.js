const Conversation = require('../models/conversation.model');
const Message = require('../models/message.model');
const User = require('../models/user.model');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { uploadToCloudinaryFromBuffer } = require('../config/cloudinary');

/**
 * @desc    Get all conversations of current user
 * @route   GET /api/v1/chat/conversations
 * @access  Private
 */
const getConversations = asyncHandler(async (req, res) => {
  const conversations = await Conversation.find({
    participants: req.user._id,
  })
    .populate('participants', 'name email role avatar enrollmentId')
    .populate('lastMessage')
    .sort({ lastMessageAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, conversations, 'Conversations retrieved successfully')
  );
});

/**
 * @desc    Get or create 1-on-1 conversation with another user
 * @route   POST /api/v1/chat/conversations
 * @access  Private
 */
const getOrCreateConversation = asyncHandler(async (req, res) => {
  const { recipientId } = req.body;

  if (!recipientId) {
    throw new ApiError(400, 'recipientId is required');
  }

  if (recipientId === req.user._id.toString()) {
    throw new ApiError(400, 'Cannot start a conversation with yourself');
  }

  const recipient = await User.findById(recipientId);
  if (!recipient) {
    throw new ApiError(404, 'Recipient user not found');
  }

  let conversation = await Conversation.findOne({
    isGroup: false,
    participants: { $all: [req.user._id, recipientId], $size: 2 },
  })
    .populate('participants', 'name email role avatar enrollmentId')
    .populate('lastMessage');

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [req.user._id, recipientId],
      isGroup: false,
    });
    conversation = await Conversation.findById(conversation._id).populate(
      'participants',
      'name email role avatar enrollmentId'
    );
  }

  return res.status(200).json(
    new ApiResponse(200, conversation, 'Conversation ready')
  );
});

/**
 * @desc    Send a message in a conversation (with optional file upload)
 * @route   POST /api/v1/chat/conversations/:conversationId/messages
 * @access  Private
 */
const sendMessage = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;
  const { text } = req.body;

  const conversation = await Conversation.findOne({
    _id: conversationId,
    participants: req.user._id,
  });

  if (!conversation) {
    throw new ApiError(404, 'Conversation not found or you are not a participant');
  }

  const attachments = [];

  // If a file is uploaded (image, PDF, etc.)
  if (req.file) {
    const isPdf = req.file.mimetype === 'application/pdf';
    const uploadResult = await uploadToCloudinaryFromBuffer(
      req.file.buffer,
      'chh_school/chat_attachments',
      isPdf ? 'raw' : 'image'
    );
    attachments.push({
      url: uploadResult.secure_url,
      fileType: isPdf ? 'pdf' : 'image',
      name: req.file.originalname,
    });
  }

  if (!text && attachments.length === 0) {
    throw new ApiError(400, 'Message text or attachment is required');
  }

  const message = await Message.create({
    conversationId,
    sender: req.user._id,
    text: text || '',
    attachments,
    readBy: [req.user._id],
  });

  // Update conversation's last message pointer
  conversation.lastMessage = message._id;
  conversation.lastMessageAt = new Date();
  await conversation.save();

  const populatedMessage = await Message.findById(message._id).populate(
    'sender',
    'name email role avatar'
  );

  return res.status(201).json(
    new ApiResponse(201, populatedMessage, 'Message sent successfully')
  );
});

/**
 * @desc    Get messages for a conversation
 * @route   GET /api/v1/chat/conversations/:conversationId/messages
 * @access  Private
 */
const getMessages = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const skip = (page - 1) * limit;

  const conversation = await Conversation.findOne({
    _id: conversationId,
    participants: req.user._id,
  });

  if (!conversation) {
    throw new ApiError(404, 'Conversation not found or access denied');
  }

  const total = await Message.countDocuments({ conversationId });
  const messages = await Message.find({ conversationId })
    .populate('sender', 'name email role avatar')
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit);

  // Auto-mark unread messages as read by current user
  await Message.updateMany(
    { conversationId, readBy: { $ne: req.user._id } },
    { $addToSet: { readBy: req.user._id } }
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        messages,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
      'Messages fetched successfully'
    )
  );
});

module.exports = {
  getConversations,
  getOrCreateConversation,
  sendMessage,
  getMessages,
};
