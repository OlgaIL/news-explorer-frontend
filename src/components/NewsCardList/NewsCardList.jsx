import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';



function NewsCardList(props) {

	const allPageCounts = props.pages;
	const [currentIndex , setIsCurrentIndex] = React.useState(allPageCounts-1);
	
	const cardsForThree = (index) => {
		let countList = 3;
		if (props.savedPage) {countList = props.totalResults;}
		return 	props.cards.slice(0, index*countList);
	}

	function handleClick(){
		const index =  currentIndex - 1;
		setIsCurrentIndex(index);
	}
	//props.totalResults




	return (
		<section className="cardList">
		{!props.savedPage && <h2 className="cardList__header">Результаты поиска</h2> }
				<ul className="cardList__list">
					{cardsForThree(allPageCounts - currentIndex).map((card, index)  => <NewsCard key={index} {...card} {...props}  />)}
				</ul>
				{currentIndex>0 && <button type="button" className="cardList__button" onClick={handleClick}>Показать еще</button>}

		</section>
	);
}

export default NewsCardList;

