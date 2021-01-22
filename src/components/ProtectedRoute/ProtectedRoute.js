import React from 'react';
import { Route, Redirect } from "react-router-dom";

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
const ProtectedRoute = ({ loggedIn, ...routeProps }) => {
	return (
			
					loggedIn ? <Route {...routeProps} /> : <Redirect to="./"  />
					
)}


export default ProtectedRoute; 