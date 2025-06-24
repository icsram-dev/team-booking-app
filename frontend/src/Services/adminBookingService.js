import { API_URL } from "../constants/url"

export async function getAllBookings(params) {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${API_URL}/booking?${query}`);
  return response.json();
}

export async function deleteBooking(id, token) {
  const response = await fetch(`${API_URL}/booking/${id}}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
}