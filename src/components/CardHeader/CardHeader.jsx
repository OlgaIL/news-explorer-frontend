import React from 'react';
import { Link } from 'react-router-dom';
import './CardHeader.css';
import saveButton from '../../images/save.svg';
import savedButton from '../../images/saved.svg';

function CardHeader(props) {
	const [enterInfo , setIsEnterInfo] = React.useState(false);

	const handleOver = (e) => {
		if (!props.loggedIn) setIsEnterInfo(!enterInfo);
	}


	function handleClick(){
		if (props.loggedIn) {
			props.onCardSave({
				keyword: props.searchQuery,
				title: props.title,
				text : props.description ,
				source : props.source.name ,
				link : props.url,
				image : props.urlToImage,
				date: props.publishedAt
			});
		}else {
			props.onLogin();
		}
	}


	function selectCard(link){
		if (props.savedPage) {return 'deleteButton'}
		else {return props.selectCard(link);}
	}


	return (
				<div className={`element__top-panel ${!props.savedPage && `element__top-panel_noactive`}`}>
					<div className="element__button">
						<img tabIndex="2" src={selectCard(props.url) ? savedButton : saveButton}
						className="element__button-img" 
						alt={props.savedPage ? 'Удалить' : 'Сохранить'}
						onMouseOver={!props.loggedIn && handleOver}
						onClick={handleClick}/>
						</div>
					{enterInfo && !props.savedPage && <Link onClick={props.onLogin} className="element__tag element__tag_title element__tag_show">Войдите, чтобы сохранять статьи</Link>}
					{props.savedPage && <div className="element__tag  element__tag_show">{props.keyword}</div>}
				</div>
	);
}

export default CardHeader;

