const BASE_URL = 'https://api.gleb.nomoredomainsicu.ru';

const _getResponseData = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

const _buildAuthRequest = (email, password) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
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

export const checkToken = async () => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  return _getResponseData(response);
};
