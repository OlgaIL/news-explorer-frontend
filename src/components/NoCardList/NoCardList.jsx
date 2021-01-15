import React from 'react';
import './NoCardList.css';
import notFound  from '../../images/notfound.svg';


function NoCardList() {
	return (
			<section className="noCardList noCardList_show">
					<img src={notFound} className="noCardList__img" alt="Ничего не найдено" />
					<h2 className="noCardList__titile">Ничего не найдено</h2>
					<p className="noCardList__text">К сожалению, по вашему запросу ничего не найдено.</p>
			</section>
	);
}
export default NoCardList;