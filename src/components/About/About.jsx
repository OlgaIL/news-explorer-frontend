import React from 'react';
import './About.css';
import avatar from '../../images/avatar.png';



function About () {
	return (
		<section className="about">
		<img src={avatar} alt="Фотография автора" className="about__image" /> 
			<div className="about__content">
				<h2 className="about__header">Об авторе</h2>
				<p className="about__text">Это блок с описанием автора проекта. Здесь следует указать, как вас зовут, чем вы занимаетесь, какими технологиями разработки владеете.</p>
				<p className="about__text">Также можно рассказать о процессе обучения в Практикуме, чему вы тут научились, и чем можете помочь потенциальным заказчикам.</p>

			</div>
			
		</section>
	);
}
export default About;