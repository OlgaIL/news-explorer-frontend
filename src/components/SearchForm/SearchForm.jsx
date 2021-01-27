import React, { useCallback } from 'react';
import './SearchForm.css';
import SubmitButton from '../SubmitButton/SubmitButton';


function SearchForm(props) {
	const submitType = 'search'

	const [submitStatus , setSubmitStatus] = React.useState(false);
	const [inputSearchValue, setInputSearchValue] = React.useState(props.searchQuery);


	function handleChange (event) {
		const searchPhrase = event.target;
		setInputSearchValue(searchPhrase.value);
	}


	React.useEffect(() => {
		if (inputSearchValue!==''){setSubmitStatus(true);}
			else {setSubmitStatus(false)};
	}, [inputSearchValue]);


	function handleSubmit (e){
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();
		props.onSearch(inputSearchValue);
	}


	return (
		<section className="searchForm">
			<h1 className="searchForm__header">Что творится в мире?</h1>
			<p className="searchForm__text">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
			<form className="searchForm__form" onSubmit={handleSubmit} >
					<input type="text" name="searchPhrase" required placeholder="Введите тему новости" value={inputSearchValue} className="searchForm__input" onChange={handleChange}/>
					<SubmitButton submitStatus={submitStatus} submitType={submitType} submitText="Искать" />
			</form>
		</section>
	);
}

export default SearchForm;
