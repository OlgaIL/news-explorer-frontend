//export const BASE_URL = 'https://auth.nomoreparties.co'; 
import { BASE_URL_AUTH } from './constants';
import { getToken } from './token';


class Auth {
	constructor(apiData) {
			this.baseUrl = apiData.baseUrl;
      		this.headers = apiData.headers;
	}


	
	_handleOriginalResponse = (res) => {
		if (!res.ok) {
		return Promise.reject(new Error(`Ошибка: ${res.status}`));
		}
		return res.json();
	}

	
	getHeaders(){
			const token = getToken(); // тут мы получаем токен из localStorage
			// console.log(token);
			return {
				...this.headers,
				'Authorization': `Bearer ${token}`,
			}
		}


	register (password, email, name) {
	// console.log(JSON.stringify({password, email}));
		return fetch(`${this.baseUrl}signup`, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({password, email, name})
			})
			.then(response => {
			//console.log(response);
				if(!response.ok){
					const errorMassage = {status: response.status};
					if(response.status === 400){errorMassage.statusText = 'Некорректно заполнено одно из полей';}
					if(response.status === 403){errorMassage.statusText = 'Пользователь с такой почтой уже зарегистрирован';}
						return Promise.reject(errorMassage);
				}
				return response.json();
			})
			.then(data => data);
	};


	authorize (password, email) {
		return fetch(`${this.baseUrl}signin`, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({password, email})
		})
		.then(response => {
			// console.log(response);
			if(!response.ok){
				const errorMassage = {status: response.status};
				if(response.status === 400){errorMassage.statusText = 'Не передано одно из полей';}
				if(response.status === 401){errorMassage.statusText = 'Неправильные почта или пароль';}
				return Promise.reject(errorMassage);
			}
			return response.json();
		})
		.then(data => data);
	};

	//**  */
	getContent (token) {
			return fetch(`${this.baseUrl}users/me`, {
				method: 'GET',
				headers: this.getHeaders()
			})
			.then(this._handleOriginalResponse)
			.then(data => data);
	};

	getSavedCards() {
		return fetch(`${this.baseUrl}articles`, {
			headers: this.getHeaders()
		})
			.then(this._handleOriginalResponse);
	}


	deleteCard (id) {
		return fetch(`${this.baseUrl}articles/${id}`, {
			method: 'DELETE',
			headers: this.getHeaders()
		})
		.then(this._handleOriginalResponse);
	}
	
	createCard (item) { 
		return fetch(`${this.baseUrl}articles`, {
			method: 'POST',
			headers: this.getHeaders(),
			body: JSON.stringify(item)
		})
		.then(this._handleOriginalResponse);
	}


}

const userAuth = new Auth({
	//baseUrl: 'https://olgail.students.nomoredomains.rocks',
	baseUrl: `${BASE_URL_AUTH}`,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	}
});



export default userAuth;

