import React from 'react';
import './SearchForm.css';
import SubmitButton from '../SubmitButton/SubmitButton';


function SearchForm() {
	const submitType = 'search'

	const [submitStatus , setSubmitStatus] = React.useState(false);
	const [inputValue, setInputValue] = React.useState("");


	function handleChange (event) {
		const searchPhrase = event.target;
		setInputValue(searchPhrase.value);
	}


	React.useEffect(() => {
		if (inputValue!==''){setSubmitStatus(true);}
			else {setSubmitStatus(false)};

	}, [inputValue]);

	function handleSubmit (e) {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();
	}


	return (
		<section className="searchForm">
			<h1 className="searchForm__header">Что творится в мире?</h1>
			<p className="searchForm__text">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
			<form className="searchForm__form" onSubmit={handleSubmit} >
					<input type="text"name="searchPhrase" placeholder="Введите тему новости" value={inputValue} className="searchForm__input" onChange={handleChange}/>
					<SubmitButton submitStatus={submitStatus} submitType={submitType} submitText="Искать" />
			</form>
		</section>
	);
}

export default SearchForm;
