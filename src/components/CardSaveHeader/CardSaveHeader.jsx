import React from 'react';
import './CardSaveHeader.css';
import deleteButton  from '../../images/delete.svg';


function CardSaveHeader(props) {

	function handleClick(){
		props.onDelete(props._id);
	}

	return (
				<div className="element__top-panel">
					<div className="element__button">
						<img tabIndex="2" src={deleteButton} className="element__button-img" alt="Удалить"	onClick={handleClick}/>
					</div>
					<div className="element__tag  element__tag_show">{props.keyword}</div>
				</div>
	);
}

export default CardSaveHeader;

