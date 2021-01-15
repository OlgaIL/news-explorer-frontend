import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';


function NewsCardList(props) {

	return (
		<section className="cardList">
		{props.savedPage ? '' : <h2 className="cardList__header">Результаты поиска</h2> }
				<ul className="cardList__list">
					
				{props.cards.map(card  => <NewsCard key={card._id} {...card} savedPage={props.savedPage} onCardLike ={props.onCardLike} onCardDelete={props.onCardDelete} />)}
									
					
				</ul>
		{props.savedPage ? '' : <button type="button" className="cardList__button">Показать еще</button> }
			
		</section>
	);
}

export default NewsCardList;

