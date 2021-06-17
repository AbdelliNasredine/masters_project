import {API_BASE_URL} from '../constants';

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

export async function getUserInformation(userToken) {
  const response = await fetch(`${API_BASE_URL}/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
  });
  return await response.json();
}
