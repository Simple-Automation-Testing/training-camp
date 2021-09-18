const {getRandomString, isArray} = require('sat-utils');
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

  if(!sessionId) {
    return [];
  }
  const sessionData = sessions[sessionId] || [];
  const data = [...sessionData].splice(+offset, sessionData.length)

  return data
}

function getSessions() {
  const sessionsKeys = Object.keys(sessions);
  return sessionsKeys.map((sessionId) => {
    const item = sessions[sessionId].find((item) => item.userName !== 'admin');
    if(item) {
      return {sessionId, userName: item.userName};
    }
    return {sessionId,  userName: 'Not found'}
  })
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

setInterval(() => {
  Object.keys(sessions).forEach((session) => {
    if(isArray(sessions[session])) {
      messages.push(...sessions[session])
      delete sessions[session];
    }
  })
}, 10 * 60 * 1000)

module.exports = {
  addMessage,
  getMessages,
  getMessagesCount,
  removeMessage,
  startSession,
  getSessions,
}