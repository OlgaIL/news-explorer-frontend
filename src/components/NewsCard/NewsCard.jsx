import React from 'react';
import './NewsCard.css';
import { ExternalLink } from 'react-external-link';
import CardHeader from '../CardHeader/CardHeader';
import CardSaveHeader from '../CardSaveHeader/CardSaveHeader';

function NewsCard(props) {
	
	
	function stringToDate(str){
		var newDate = new Date(str);
		const monthArray = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
		return newDate.getDate() + ' '+ monthArray[newDate.getMonth()]+ ", " +newDate.getFullYear();
	}


	
	return (
			<li className="element">
					{props.savedPage ? <CardSaveHeader {...props} /> : <CardHeader {...props} />}
							<img className="element__image" src={props.urlToImage} alt={props.title} />
								<div className="element__news">
									<div className="element__data">{stringToDate(props.publishedAt)}</div>
									<ExternalLink href={props.url} className="element__title">{props.title}</ExternalLink>
									<p className="element__text">{props.description}</p>
									<ExternalLink  href={props.url}  className="element__source">{props.source.name}</ExternalLink>
								</div>
			</li>
	);
}

export default NewsCard;


