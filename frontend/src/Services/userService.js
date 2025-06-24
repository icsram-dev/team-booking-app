import { API_URL } from "../constants/url"

export async function userUpdate(id, data, token, isAdmin) {
  const response = await fetch(`${API_URL}/user/${id}`, {
      method: 'PATCH',
      headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ ...data, isAdmin })
  });
  if (!response.ok) {
      throw new Error('Failed to update user');
  }
  return response.json();
}

export async function getUsers(token, params) {
  const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/user?${query}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  }

  export async function getUser(userId, token) {
    try {
        const response = await fetch(`${API_URL}/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }
        return response.json();
    } catch (error) {
        throw new Error('Failed to fetch user');
    }
}

export async function deleteUser(userId, token, isAdmin) {
  const response = await fetch(`${API_URL}/user/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ 
      isAdmin,
      isDeleted: true 
    })
  });

  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
}

export async function fetchUserData(userId) {
  const response = await fetch(`${API_URL}/user/${userId}`);
  if (!response.ok) {
      throw new Error('Failed to fetch user data');
  }
  return response.json();
}

export async function updateUserPassword(token, userId, oldPassword, newPassword) {
  const url = `${API_URL}/user/${userId}/password`;
  const body = JSON.stringify({ oldPassword, newPassword });
  const headers = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
  };
  const response = await fetch(url, {
      method: "PATCH",
      headers: headers,
      body: body
  });
  if (!response.ok) {
      const errorDetails = await response.json();
      console.error('Failed to update password:', errorDetails);
      throw new Error(`Failed to update password: ${response.statusText}`);
  }

  return response.json();
};
