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
		//	'Content-Type': 'application/json'
	}
});

export default api;

