const {getRandomString} = require('sat-utils');

const users = [{
  userId: '1',
  username: 'admin',
  password: 'admin',
  email: 'admin@admin.com',
  name: 'admin',
  isAdmin: true
}];

function login(user) {
  return users.find(u => Object.keys(user).every(k => u[k] === user[k]));
}

function isAdmin(user) {
  const isAdminUser = users.find(u => Object.keys(user).every(k => u[k] === user[k]));
  if(isAdminUser) {
    return isAdminUser.isAdmin;
  }
}

function getUsersList() {
  return [...users];
}

function register(user) {
  users.push({...user, userId: getRandomString(12)});
  return true;
}

module.exports = {
  login,
  register,
  isAdmin,
  getUsersList
}
