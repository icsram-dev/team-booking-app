import { API_URL } from "../constants/url";

export const createBooking = async (user, accommodationId, bookingData) => {
  const response = await fetch(`${API_URL}/booking/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`,
    },
    body: JSON.stringify({
      accommodationId,
      ...bookingData,
      userId: user.id, 
    }),
  });

  if (!response.ok) {
    throw new Error('Foglalás sikertelen');
  }

  return response.json();
};

export async function getUserBookings(userId) {
  const response = await fetch(`${API_URL}/booking/user/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch bookings');
  }
  return response.json();
}

export async function cancelBooking(bookingId) {
  const token = JSON.parse(localStorage.getItem('user')).token;
  const response = await fetch(`${API_URL}/booking/${bookingId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    throw new Error(`Failed to cancel booking: ${errorDetails.message}`);
  }

  return response.json();
};

export async function updateBooking(bookingId, data, token) {
  const response = await fetch(`${API_URL}/booking/${bookingId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error('Failed to update booking');
  }
  return response.json();
};

export async function getBooking(bookingId, token) {
  const response = await fetch(`${API_URL}/booking/${bookingId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch booking');
  }
  return response.json();
}