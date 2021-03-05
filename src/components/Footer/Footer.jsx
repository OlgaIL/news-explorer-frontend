import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'react-external-link';

import './Footer.css';
import logoGithub from '../../images/logogithub.svg';
import logoFacebook from '../../images/logofacebook.svg';


function Footer () {
	return (
		<footer className="footer">
			<p className="footer__copyright">&copy; 2020 Ольга Ильина, Powered by News API</p>
			<nav>
				<ul className="footer__navbar">
					<li className="footer__navbar-element">
						<Link to="/" className="footer__navbar_link">Главная</Link>
					</li>
					<li  className="footer__navbar-element">
						<ExternalLink href="https://praktikum.yandex.ru/" className="footer__navbar_link">
							Яндекс.Практикум
						</ExternalLink>
					</li>
					</ul>
			</nav>
				<ul className="footer__navbar-social">
					<li>
						<ExternalLink href="https://github.com/OlgaIL/" className="footer__navbar_link">
							<img src={logoGithub} className="footer__navbar-icon" alt="Github" />
						</ExternalLink>
					</li>
					<li>
						<ExternalLink href="https://www.facebook.com/olga.k.ilyina" className="footer__navbar_link">
							<img src={logoFacebook} className="footer__navbar-icon" alt="Facebook" />
						</ExternalLink>
					</li>
				</ul>
			
		</footer>
	);
}
export default Footer;