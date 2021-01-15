import { getToken } from './token';
import { BASE_URL } from './constants';
 
 
 class Api {
    constructor(apiData) {
        this.baseUrl = apiData.baseUrl;
		this.headers = apiData.headers; /** объект */
	}

	_handleOriginalResponse = (res) => {
		if (!res.ok) {
		return Promise.reject(new Error(`Ошибка: ${res.status}`));
		}
		return res.json();
	}


	getHeaders(){
		const token = getToken(); // тут мы получаем токен из localStorage
		return {
			...this.headers,
			'Authorization': `Bearer ${token}`,
		}
	}

	getInitialCards() {
		return fetch(`${this.baseUrl}cards`, {
			headers: this.getHeaders()
		})
			.then(this._handleOriginalResponse);
	}

	getInitialUser() {
		return fetch(`${this.baseUrl}users/me`, {
			headers: this.getHeaders()
		})
		.then(this._handleOriginalResponse);
	}

	putUserInfo(item) {
		return fetch(`${this.baseUrl}users/me`, {
			method: 'PATCH',
			headers: this.getHeaders(),
			body: JSON.stringify(item)
		})
		.then(this._handleOriginalResponse);
		
	}


	putAvatarInfo(avatar) {
		console.log(avatar);
		return fetch(`${this.baseUrl}users/me/avatar`, {
			method: 'PATCH',
			headers: this.getHeaders(),
			body: JSON.stringify(avatar)
		})
		.then(this._handleOriginalResponse);
	}


	deleteCard (id) {
		return fetch(`${this.baseUrl}cards/${id}`, {
			method: 'DELETE',
			headers: this.getHeaders()
		})
		.then(this._handleOriginalResponse);
	}
	
	createCard (item) { 
		return fetch(`${this.baseUrl}cards`, {
			method: 'POST',
			headers: this.getHeaders(),
			body: JSON.stringify(item)
		})
		.then(this._handleOriginalResponse);
	}
	

	putLike (id) {
			return fetch(`${this.baseUrl}cards/likes/${id}`, {
				method: 'PUT',
				headers: this.getHeaders()
			})
			.then(this._handleOriginalResponse);
	}

	deleteLike (id) {
			return fetch(`${this.baseUrl}cards/likes/${id}`, {
				method: 'DELETE',
				headers: this.getHeaders()
			})
			.then(this._handleOriginalResponse);
		}

	changeLikeCardStatus(id, isLiked) {
		const res = isLiked ? this.putLike(id) : this.deleteLike(id);
		return res;
	}

}


const api = new Api({
	baseUrl: `${BASE_URL}`,
	headers: {
	//	authorization: 'b5b09145-9ffa-43dc-a8a7-afd53c9e00bd',
		'Content-Type': 'application/json'
	}
});


export default api;

