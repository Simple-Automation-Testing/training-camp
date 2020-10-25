const users = [
  {
    username: 'admin',
    password: 'admin',
    email: 'admin@admin.com',
    name: 'admin',
    isAdmin: true
  }
];

function login(user) {
  return users.some(u => Object.keys(user).every(k => u[k] === user[k]));
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
  users.push(user);
  return true;
}

module.exports = {
  login,
  register,
  isAdmin,
  getUsersList
}
