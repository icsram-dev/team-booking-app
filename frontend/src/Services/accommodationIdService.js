import { API_URL } from "../constants/url";

export async function getAccommodationId(accommodationId) {

    const response = await fetch(`${API_URL}/accommodation/${accommodationId}`,)
    return await response.json();
    
};