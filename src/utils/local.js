
export const setLocal = (key, result) => {
	localStorage.setItem(key, JSON.stringify(result));
}

export const getLocal = (key) => JSON.parse(localStorage.getItem(key));


export const removeLocal = (key) => {
	localStorage.removeItem(key);
}
