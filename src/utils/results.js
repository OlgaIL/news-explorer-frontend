
const RESULT_KEY = 'searchResult';
// сохраняем 'cards';

export const setResult = (result) => {
	localStorage.setItem(RESULT_KEY, JSON.stringify(result));
}

export const getResult = () => JSON.parse(localStorage.getItem(RESULT_KEY));


export const removeResult = () => {
	localStorage.removeItem(RESULT_KEY);
}
