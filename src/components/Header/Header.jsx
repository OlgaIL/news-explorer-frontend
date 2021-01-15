import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import Profile from '../Profile/Profile';



function Header(props) {

	const logoClass = (
		`header__logotext ${props.savedPage ? ' header__logotext_theme_invert' : ''}`
	);
	const headerClass = (
		`${!props.savedPage ? 'header' : 'header header_theme_invert'}`
	);
	const headerNavClass = (
		`${!props.savedPage ? 'header__nav' : 'header__nav header__nav_theme_invert'}`
	);

	const  linkClass = (
		`${!props.savedPage ? 'header__link' : 'header__link header__link_theme_invert'}`
	);
	const  buttonClass = (
		`${!props.savedPage ? 'header__link header__link_button' : 'header__link header__link_button header__link_button_theme_invert'}`
	);

	const lineClass = (
		`${!props.savedPage ? 'line' : 'line line_black'}`
	);






	return (
		<header className={headerClass}>
			<NavLink to="/" exact className={logoClass} activeClassName="header__logotext_active" onClick={props.onClickNotSavedPage}>NewsExplorer</NavLink>
			<ul className="header__menu-icon" tabindex='2'>
					<div className={lineClass}></div>
					<div className={lineClass}></div>
			</ul>
			<nav className={headerNavClass} tabindex='1'>
				<NavLink to="/" exact className={linkClass} activeClassName="header__link_active" onClick={props.onClickNotSavedPage}>Главная</NavLink>
				{ props.loggedIn ?  <Profile  {...props} /> : <button type="button" className={buttonClass} onClick={props.onLogin}>Авторизоваться</button> }
			</nav>
		</header>
	);
}

export default Header;
