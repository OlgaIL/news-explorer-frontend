import React from 'react';
import './About.css';
import avatar from '../../images/avatar.jpg';



function About () {
	return (
		<section className="about">
		<img src={avatar} alt="Фотография автора" className="about__image" /> 
			<div className="about__content">
				<h2 className="about__header">Об авторе</h2>
				<p className="about__text">Меня зовут Ольга Ильина.</p>
				<p className="about__text">Я - почти выпускница 14-го потока курса Веб-разработка Яндекс.Практикума. 
				Обучение было очень интенсивным и интересным.</p>
				
				<p className="about__text">Я обновила и структурировала свои знания по верстке и javascript. Освоила БЭМ. Актуализировала знания  использования Git.
				Научилась делать простые проекты с использоваением React. 	Освоила работу с Express-сервером (Node.js) и базой MongoBD.</p>
				<p className="about__text">Научилась самостоятельно публиковать простые проекты  -  React + Node.js, MongoBD, Git, Ngnix, PM2.</p>
			</div>
		</section>
	);
}
export default About;