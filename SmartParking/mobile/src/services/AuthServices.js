const API_BASE_URL = 'http://192.168.1.3:8080/api';

export async function authenticate(username, password) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({username, password}),
  });
  return await response.json();
}

export async function register(username, password) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({username, password}),
  });
  return await response.json();
}
