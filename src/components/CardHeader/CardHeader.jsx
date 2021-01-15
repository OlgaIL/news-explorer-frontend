import React from 'react';
import './CardHeader.css';
import deleteButton  from '../../images/delete.svg';
import saveButton from '../../images/save.svg';
//import savedButton from '../../images/saved.svg';



function CardHeader(props) {

	const tagClass = (
		`${!props.savedPage ? 'element__tag' : 'element__tag element__tag_show'}`
	);


	return (
				<div className="element__top-panel">
					<div className="element__button"><img tabIndex="2" src={props.savedPage ? deleteButton : saveButton } className="element__button-img" alt={props.savedPage ? 'Удалить' : 'Сохранить'}/></div>
					{!props.loggedIn ? <div className="element__tag element__tag_title">Войдите, чтобы сохранять статьи</div> : '' }
					<div className={tagClass}>Природа</div>
				</div>

	);
}

export default CardHeader;

