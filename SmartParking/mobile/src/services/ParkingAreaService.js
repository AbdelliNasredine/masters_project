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
