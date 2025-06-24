import { API_URL } from "../constants/url"

export async function createUserAccommodation(token, name, location, type, description, price, services, photos) {
    
    const response = await fetch(`${API_URL}/accommodation`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, location, type, description, price, services, photos })
    })
    return response.json()
};

export async function getAllUserAccommodation(token, params) {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/accommodation/user?${query}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    return response.json()
};

export async function updateUserAccommodation(token, accommodationId, patchData) {
    const response = await fetch(`${API_URL}/accommodation/user/${accommodationId}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(patchData),
    })
    return response.json()
};

export async function deleteUserAccommodation(token, accommodationId) {
    const response = await fetch(`${API_URL}/accommodation/user/${accommodationId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });
    return response.json();
}