/** @format */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInForm from '../../components/SignInForm';
import { useAuth } from '../../Context/globaltContext';
import '../../font.css/index.css';

const SignIn = () => {
	const navigate = useNavigate();
	const { user_id: isAuth } = useAuth();

	useEffect(() => {
		if (isAuth) {
			navigate('/');
		}
	});
	return <>{isAuth ? null : <SignInForm />}</>;
};

export default SignIn;
