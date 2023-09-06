const BASE_URL = 'https://auth.nomoreparties.co';

const _getResponseData = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

const _buildAuthRequest = (email, password) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  };
};

export const registration = async (email, password) => {
  const response = await fetch(
    `${BASE_URL}/signup`,
    _buildAuthRequest(email, password)
  );
  return _getResponseData(response);
};

export const login = async (email, password) => {
  const response = await fetch(
    `${BASE_URL}/signin`,
    _buildAuthRequest(email, password)
  );

  return _getResponseData(response);
};

export const checkToken = async (token) => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return _getResponseData(response);
};
