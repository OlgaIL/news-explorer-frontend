import React from 'react';
import './NewsCard.css';
import { ExternalLink } from 'react-external-link';
import CardHeader from '../CardHeader/CardHeader';


function NewsCard(props) {
	return (
			<li className="element">
					<CardHeader  savedPage={props.savedPage} />
							<img className="element__image" src={props.image} alt={props.name} />
								<div className="element__news">
									<div className="element__data">{props.data}</div>
									<ExternalLink href={props.link} className="element__title">{props.name}</ExternalLink>
									<p className="element__text">{props.text}</p>
									<ExternalLink  href="#"  className="element__source">{props.source}</ExternalLink>
								</div>
			</li>
	);
}


export default NewsCard;

