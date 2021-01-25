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
		if (props.loggedIn && !selectCard(props.url)) {
				props.onCardSave({
						keyword: props.searchQuery,
						title: props.title,
						text : props.description,
						source : props.source.name ,
						link : props.url,
						image : props.urlToImage,
						date: props.publishedAt
			});
		}else{
			if (!props.loggedIn) {
					props.onLogin();
				}else{
					props.onDelete(selectCard(props.url)._id);
				}
		}
	}

	function selectCard(link){
		return props.selectCard(link);
	}


	return (
				<div className="element__top-panel element__top-panel_noactive">
					<div className="element__button">
						<img 
						src={props.loggedIn ? (!selectCard(props.url) ? saveButton : savedButton) : saveButton }
						className={`element__button-img ${!selectCard(props.url) ? '' : 'element__button-img_saved'}`} 
						alt={selectCard(props.url) ? 'Удалить' : 'Сохранить'}
						onMouseOver={!props.loggedIn && handleOver}
						onClick={handleClick}/>
					</div>
					{enterInfo &&  <Link onClick={props.onRegistration} className="element__tag element__tag_title element__tag_show">Войдите, чтобы сохранять статьи</Link>}
				</div>
	);
}

export default CardHeader;

