import React from 'react';
import { Link } from 'react-router-dom';
import './CardHeader.css';
import deleteButton  from '../../images/delete.svg';
import saveButton from '../../images/save.svg';
// import savedButton from '../../images/saved.svg';

function CardHeader(props) {
	const [enterInfo , setIsEnterInfo] = React.useState(false);

	const handleOver = (e) => {
		if (!props.loggedIn) setIsEnterInfo(!enterInfo);
	}

	const tagClass = (
		//`${!props.savedPage ? 'element__tag' : 'element__tag element__tag_show'}`
		`element__tag ${props.savedPage && ` element__tag_show`}`
	);

	return (
				<div className={`element__top-panel ${enterInfo && `element__top-panel_noactive`}`}>
					<div className="element__button"><img tabIndex="2" src={props.savedPage ? deleteButton : saveButton } className="element__button-img" alt={props.savedPage ? 'Удалить' : 'Сохранить'} onMouseOver={handleOver}/></div>
					{enterInfo && <Link onClick={props.onLogin} className="element__tag element__tag_title element__tag_show">Войдите, чтобы сохранять статьи</Link>}
					<div className={tagClass}>Природа</div>
				</div>
	);
}

export default CardHeader;

