/** @format */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../../components/SignUpForm';
import { useAuth } from '../../Context/globaltContext';
import '../../font.css/index.css';

const SignUp = () => {
	const navigate = useNavigate();
	const { user_id: isAuth } = useAuth();

	useEffect(() => {
		if (isAuth) {
			navigate('/');
		}
	});
	return <>{isAuth ? null : <SignUpForm />}</>;
};

export default SignUp;
