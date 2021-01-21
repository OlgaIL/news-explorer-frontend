import React from 'react';
import {NavLink } from 'react-router-dom';
import './Profile.css';
import {CurrentUserContext} from '../../context/CurrentUserContext';

function Profile(props) {
	const currentUser = React.useContext(CurrentUserContext); // подписываем на контекст
	const  linkClass = (
		`${!props.savedPage ? 'header__link' : 'header__link header_theme_invert'}`
	);
	const  buttonClass = (
		`${!props.savedPage ? 'header__link header__link_button' : 'header__link header__link_button header__link_button_theme_invert'}`
	);

	const  imgClass = (
		`${!props.savedPage ? 'profile__img' : 'profile__img profile__img_theme_invert'}`
	);

	const  linkActiveClass = (
		`${!props.savedPage ? 'header__link_active' : 'header__link_active header__link_button_theme_invert'}`
	);


	function signOut() {
		props.onLogOut();
	}

	return (
					<div className = "profile">
						<NavLink to="/saved-news" className={linkClass} activeClassName={linkActiveClass} onClick={props.onClickSavedPage}>Сохраненные статьи</NavLink>
						<div className={buttonClass} onClick={signOut}><span className="profile__name">{currentUser.name}</span> <button className={imgClass} onClick={signOut} /></div>
					</div>
	
	
	);
}

export default Profile;