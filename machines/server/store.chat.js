const {getRandomString} = require('sat-utils');
/**
 * @typedef {object} message
 * @property {string} id id
 * @property {string} content content
 * @property {string} userName userName
 * @property {string} userId userId
 * @property {string} replyUserId replyUserId
 */
const messages = [];

const sessions = {};

function getMessages({sessionId, offset = 0} = {}) {
  sessionId = sessionId || Object.keys(sessions)[0];
  console.log(sessionId)
  if(!sessionId) {
    return [];
  }
  const data = [...sessions[sessionId]].splice(+offset, sessions[sessionId].length)
  console.log(data, sessions, sessions[sessionId])
  return data
}

function startSession() {
  const sessionId = getRandomString(15);
  sessions[sessionId] = [];
  return sessionId;
}

function addMessage({sessionId, message}) {
  sessions[sessionId].push(message)
  return sessions[sessionId]
}

function getMessagesCount(sessionId) {
  return sessions[sessionId].length
}

function removeMessage(message) {
  const index = messages.findIndex((m) => {
    return Object.keys(message).every(k => message[k] === m[k])
  })
  if(index >= 0) {
    messages.splice(index, 1)
  }
  return messages
}

module.exports = {
  addMessage,
  getMessages,
  getMessagesCount,
  removeMessage,
  startSession,
}