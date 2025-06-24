import { API_URL } from "../constants/url"

export async function getAllAccommodation(params = {}) {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/accommodation?${query}`,);
    return response.json();
}

export async function getAccommodation(accommodationId) {
    const response = await fetch(`${API_URL}/accommodation/${accommodationId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch accommodation');
    }
    return response.json();
}

export async function createAccommodation(data, token) {
    const response = await fetch(`${API_URL}/accommodation`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error('Failed to create accommodation');
    }
    return response.json();
}

export async function updateAccommodation(accommodationId, data, token) {
    const response = await fetch(`${API_URL}/accommodation/${accommodationId}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error('Failed to update accommodation');
    }
    return response.json();
}

export async function deleteAccommodation(accommodationId, token) {
    const response = await fetch(`${API_URL}/accommodation/${accommodationId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to delete accommodation');
    }
}
