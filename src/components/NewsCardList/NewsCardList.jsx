import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';



function NewsCardList(props) {

	const allPageCounts = Math.ceil(props.totalResults/3);
	//const currentIndex = allPageCounts;
	const [currentIndex , setIsCurrentIndex] = React.useState(allPageCounts-1);
	
	const cardsForThree = (index) => {
		return 	props.cards.slice(0, index*3);
	}

	function handleClick(){
		const index =  currentIndex - 1;
		setIsCurrentIndex(index);
		console.log(currentIndex);
	}
	//props.totalResults


	return (
		<section className="cardList">
		{props.savedPage ? '' : <h2 className="cardList__header">Результаты поиска</h2> }
				<ul className="cardList__list">
						{cardsForThree(allPageCounts - currentIndex).map((card, index)  => <NewsCard key={index} {...card} savedPage={props.savedPage} onCardLike ={props.onCardLike} onCardDelete={props.onCardDelete} loggedIn={props.loggedIn}  onLogin={props.onLogin} />)}
				</ul>
				{currentIndex>0 && <button type="button" className="cardList__button" onClick={handleClick}>Показать еще</button>}

		</section>
	);
}

export default NewsCardList;

