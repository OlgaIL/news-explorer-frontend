//export const BASE_URL = 'https://auth.nomoreparties.co'; 
import { BASE_URL } from './constants';

class Auth {
	constructor(apiData) {
        this.baseUrl = apiData.baseUrl;
		this.headers = apiData.headers;
	}


	register (password, email) {
	// console.log(JSON.stringify({password, email}));
		return fetch(`${BASE_URL}signup`, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({password, email})
			})
			.then(response => {
			// console.log(response);
				if(!response.ok){
					const errorMassage = {status: response.status};
					if(response.status === 400){errorMassage.statusText = 'Некорректно заполнено одно из полей';}
						return Promise.reject(errorMassage);
				}
				return response.json();
			})
			.then(data => data);
	};


	authorize (password, email) {
		return fetch(`${BASE_URL}signin`, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({password, email})
		})
		.then(response => {
			//console.log(response);
			if(!response.ok){
				const errorMassage = {status: response.status};
				if(response.status === 400){errorMassage.statusText = 'Не передано одно из полей';}
				if(response.status === 401){errorMassage.statusText = 'Пользователь с email не найден';}
				return Promise.reject(errorMassage);
			}
			return response.json();
		})
		.then(data => data);
	};

	getContent (token) {
		this.headers.Authorization =  `Bearer ${token}`;
	// console.log(this.headers);
			return fetch(`${BASE_URL}users/me`, {
			method: 'GET',
			headers: this.headers
			})
			.then(response => {
						if(!response.ok){
							const errorMassage = {status: response.status};
							if(response.status === 400){errorMassage.statusText = 'Токен не передан или передан не в том формате';}
							if(response.status === 401){errorMassage.statusText = 'Переданный токен некорректен';}
						return Promise.reject(errorMassage);
						}
			return response.json();
			})
			.then(data => data);
	};
}

const userAuth = new Auth({
	//baseUrl: 'https://olgail.students.nomoredomains.rocks',
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	}
});



export default userAuth;

