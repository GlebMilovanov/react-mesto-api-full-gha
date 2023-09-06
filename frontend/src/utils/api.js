import { apiURL, apiGroupId, apiToken } from './constants';

class Api {
  constructor(url, groupId, token) {
    this._url = url;
    this._groupId = groupId;
    this._headers = {
      authorization: token,
      'Content-Type': 'application/json',
    };
  }

  /* check if response is ok */
  _getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  /* request user and cards info */
  async getAppInfo() {
    const [cardsInfo, userInfo] = await Promise.all([
      this.getCardsInfo(),
      this.getUserInfo(),
    ]);
    return [cardsInfo, userInfo];
  }

  /* get user info  from server */
  async getUserInfo() {
    const response = await fetch(`${this._url}${this._groupId}users/me`, {
      headers: this._headers,
    });

    return this._getResponseData(response);
  }

  /* get cards info  from server */
  async getCardsInfo() {
    const response = await fetch(`${this._url}${this._groupId}cards`, {
      headers: this._headers,
    });

    return this._getResponseData(response);
  }

  /* send user info to server */
  async sendUserInfo({ name, about }) {
    const response = await fetch(`${this._url}${this._groupId}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });

    return this._getResponseData(response);
  }

  /* create new card */
  async createCard({ name, link }) {
    const response = await fetch(`${this._url}${this._groupId}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });

    return this._getResponseData(response);
  }

  /* delete your card */
  async deleteCard(cardId) {
    const response = await fetch(
      `${this._url}${this._groupId}cards/${cardId}`,
      {
        method: 'DELETE',
        headers: this._headers,
      }
    );

    return this._getResponseData(response);
  }

  /* like card */
  async likeCard(cardId) {
    const response = await fetch(
      `${this._url}${this._groupId}cards/${cardId}/likes`,
      {
        method: 'PUT',
        headers: this._headers,
      }
    );

    return this._getResponseData(response);
  }

  /* remove like */
  async removeCardLike(cardId) {
    const response = await fetch(
      `${this._url}${this._groupId}cards/${cardId}/likes`,
      {
        method: 'DELETE',
        headers: this._headers,
      }
    );

    return this._getResponseData(response);
  }

  /* change like status */

  async changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? 'PUT' : 'DELETE';
    const response = await fetch(
      `${this._url}${this._groupId}cards/${cardId}/likes`,
      {
        method: method,
        headers: this._headers,
      }
    );

    return this._getResponseData(response);
  }

  /* update user photo */
  async updateUserAvatar({ avatar }) {
    const response = await fetch(
      `${this._url}${this._groupId}users/me/avatar`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar,
        }),
      }
    );

    return this._getResponseData(response);
  }
}

export const api = new Api(apiURL, apiGroupId, apiToken);
