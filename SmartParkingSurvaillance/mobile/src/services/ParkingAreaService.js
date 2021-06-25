import {API_BASE_URL} from '../constants';

export async function findAllParkingAreas(userToken) {
  const response = await fetch(`${API_BASE_URL}/parkings`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
  });
  return await response.json();
}

export async function reserveSpot(userToken, parkingId, spotId) {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({parkingId, spotId}),
  };
  const response = await fetch(`${API_BASE_URL}/reserve`, options);
  return await response.json();
}

export async function getCurrentReservationStatus(userToken) {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
  };
  const response = await fetch(`${API_BASE_URL}/reservation_status`, options);
  return await response.json();
}
export async function checkout(userToken) {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
  };
  const response = await fetch(`${API_BASE_URL}/checkout`, options);
  return await response.json();
}
