import React from 'react';
import './NoCardList.css';
import notFound  from '../../images/notfound.svg';


function NoCardList(props) {
	const noCardListClass = (
		`noCardList ${(props.statusSearch ==='') || props.isPreload ? '' : 'noCardList_show'}`
	);
	// переписать условие!!! 

	return (
			<section className={noCardListClass}>
				{props.statusSearch!=="error" && props.totalResults ===0 ? 
				(
						<div>
							<img src={notFound} className="noCardList__img" alt="Ничего не найдено" />
							<h2 className="noCardList__titile">Ничего не найдено</h2>
							<p className="noCardList__text">К сожалению, по вашему запросу ничего не найдено.</p>
						</div> 
				) : (
						<div>
							<h2 className="noCardList__titile">Во время запроса произошла ошибка.</h2>
							<p className="noCardList__text">Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>
						</div>
					)
				}
			</section>
	);
}
export default NoCardList;