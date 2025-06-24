import { API_URL } from "../constants/url";

export async function getFavourites(token) {
    const response = await fetch(`${API_URL}/favourites`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch favourites');
    }
  
    return response.json();
  }

export async function addFavourite(accommodationId, token) {
    const response = await fetch(`${API_URL}/favourites/${accommodationId}`, {
        method: 'POST',
        headers: {
             'Authorization': `Bearer ${token}`
        },
    });
    if (!response.ok) {
        throw new Error('Failed to add favourite');
    }
    return response.json();
}

export async function removeFavourite(id, token) {
    const response = await fetch(`${API_URL}/favourites/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  
    if (!response.ok) {
      throw new Error('Failed to remove favourite');
    }
  
    return response.json();
  }
