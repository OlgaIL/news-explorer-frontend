import { BASE_URL } from './constants';

class Api {
    constructor(apiData) {
        this.baseUrl = apiData.baseUrl;
		this.headers = apiData.headers; /** объект */
		console.log(this.baseUrl);
	}

	_handleOriginalResponse = (res) => {
		if (!res.ok) {
		return Promise.reject(new Error(`Ошибка: ${res.status}`));
		}
		return res.json();
	}


	getHeaders(){
	//	const token = getToken(); // тут мы получаем токен из localStorage
		return {
			...this.headers
		//, 	'Authorization': `Bearer ${token}`,
		}
	}


	getSearchCards(query, fromData, toData) {
		return fetch(`${this.baseUrl}&q=${query}&from=${fromData}&to=${toData}`, {
			headers: this.getHeaders()
		})
			.then(this._handleOriginalResponse);
	}


}


const api = new Api({
	baseUrl: `${BASE_URL}`,
	headers: {
	//	authorization: 'b5b09145-9ffa-43dc-a8a7-afd53c9e00bd',
	//	'Content-Type': 'application/json'
	}
});


export default api;

