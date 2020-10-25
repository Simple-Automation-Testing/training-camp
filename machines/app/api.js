const origin = window.origin

async function loginApi(user) {
  const resp = await fetch(`${origin}/login`, {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify(user)
  }).then(r => r.json()).catch((e) => e)
  return resp
}

async function registerApi(user) {
  const resp = await fetch(`${origin}/register`, {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify(user)
  }).then(r => r.json()).catch((e) => e)
  return resp
}

async function userIsAdminApi(user) {
  const resp = await fetch(`${origin}/is_admin`, {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify(user)
  }).then(r => r.json()).catch((e) => e)
  return resp
}

async function getMachinesApi() {
  const resp = await fetch(`${origin}/get_machines`, {
    headers: {'Content-Type': 'application/json'}
  }).then(r => r.json()).catch((e) => e)
  return resp
}

async function removeMachineApi(machine) {
  const resp = await fetch(`${origin}/remove_machine`, {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify(machine)
  }).then(r => r.json()).catch((e) => e)
  return resp
}

async function addMachineApi(machine) {
  const resp = await fetch(`${origin}/add_machine`, {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify(machine)
  }).then(r => r.json()).catch((e) => e)
  return resp
}

async function adminCreateUser(admin, user) {
  const resp = await fetch(`${origin}/create_new_user`, {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify({admin, user})
  }).then(r => r.json()).catch((e) => e)
  return resp
}

async function adminGetUserList(admin) {
  const resp = await fetch(`${origin}/get_users`, {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify({admin})
  }).then(r => r.json()).catch((e) => e)
  return resp
}


async function addCombaineApi(machine) {
  const resp = await fetch(`${origin}/add_combaine`, {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify(machine)
  }).then(r => r.json()).catch((e) => e)
  return resp
}

async function getCombainesApi(queries = '') {
  const resp = await fetch(`${origin}/get_combaines${queries}`, {
    headers: {'Content-Type': 'application/json'}
  }).then(r => r.json()).catch((e) => e)
  return resp
}

async function removeCombaineApi(machine) {
  const resp = await fetch(`${origin}/remove_combaine`, {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify(machine)
  }).then(r => r.json()).catch((e) => e)
  return resp
}

async function getCombainesCountApi() {
  const resp = await fetch(`${origin}/get_combaines_count`, {
    headers: {'Content-Type': 'application/json'}
  }).then(r => r.json()).catch((e) => e)
  return resp
}


export {
  loginApi,
  registerApi,
  addMachineApi,
  removeMachineApi,
  getMachinesApi,
  userIsAdminApi,
  adminCreateUser,
  adminGetUserList,
  addCombaineApi,
  getCombainesApi,
  removeCombaineApi,
  getCombainesCountApi
}