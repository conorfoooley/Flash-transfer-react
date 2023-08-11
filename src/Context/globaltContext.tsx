/** @format */

import React, {
	useRef,
	createContext,
	useContext,
	useEffect,
	useState,
	useCallback,
} from 'react';

import { auth } from '../firebase';
import {
	OAuthProvider,
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	getRedirectResult,
	signInWithRedirect,
	signOut,
	createUserWithEmailAndPassword,
	FacebookAuthProvider,
} from 'firebase/auth';
import avatar from '../assests/Images/avatarimg.png';
import CloseIcon from '@mui/icons-material/Close';

import { Link, useNavigate } from 'react-router-dom';
import { Button, IconButton, Snackbar } from '@mui/material';
import { getUser, register, socialAuth } from '../Services/auth';
import { logout, useLogout } from '../hooks/useProfile';
import { toast } from 'react-toastify';
import useActiveWeb3React from '../hooks/useActiveWeb3React';
import { useWallet } from './wallet_context';

const AuthContext = createContext<any>(undefined);

export const useAuth = () => {
	return useContext(AuthContext);
};
const AuthProvider = ({ children }: any) => {
	const navigate = useNavigate();
	const [trFetchUser, setTrFetchUser] = useState<boolean>(true);
	// profile fields start
	const [fullName, setFullName]: any = useState('');
	const [country, setCountry] = useState();
	const { account, disconnect } = useWallet();
	// profile fields end

	const [email, setEmail] = useState<string | null>(null);
	const [password, setPassword] = useState();

	const [imgUrl, setImgUrl] = useState(avatar);
	const [currentUser, setCurrentUser] = useState();

	const [open, setOpen] = React.useState(false);
	const [error, setError]: any = useState(false);

	const [levelProgress, setLevelProgress] = React.useState(0);
	const [level, setLevel] = React.useState(1);
	const [user_id, setUserId] = useState<string | null>(null);
	const _handleLogout = useLogout();

	const signup: any = () => {
		const newEmail: any = email;
		const newPassword: any = password;

		return createUserWithEmailAndPassword(auth, newEmail, newPassword);
	};

	const googleSignIn = () => {
		const provider = new GoogleAuthProvider();
		const auth = getAuth();
		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential: any = GoogleAuthProvider.credentialFromResult(result);
				const token: any = credential.accessToken;
				// The signed-in user info.
				const user: any = result.user;
				const val: any = true;
				const data = {
					email: user.email,
					firstName: user.displayName,
					profileImg: user.photoURL,
					role: 'user',
				};

				socialAuth(data).then((res) => {
					if (res.data) {
						debugger;
						localStorage.setItem('token', res.token);
						localStorage.setItem('userData', res.data);
						localStorage.setItem('social', val);
						setTrFetchUser(true);
						navigate('/');
					}
				}); // ...
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
			});
	};
	const AppleLogin = () => {
		const provider = new OAuthProvider('apple.com');
		const auth = getAuth();
		signInWithPopup(auth, provider)
			.then((result) => {
				debugger;
				// The signed-in user info.
				const user: any = result.user;
				const val: any = true;

				// Apple credential
				const credential: any = OAuthProvider.credentialFromResult(result);
				const accessToken: any = credential.accessToken;
				// const idToken = credential.idToken;
				if (user) {
					user.getIdToken().then((tkn) => {
						const data: any = JSON.stringify(user);

						localStorage.setItem('token', tkn);
						localStorage.setItem('userData', user);
						localStorage.setItem('social', val);
					});
					setTrFetchUser(true);
					navigate('/');
				}

				// ...
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The credential that was used.
				const credential = OAuthProvider.credentialFromError(error);

				// ...
			});
	};
	const signInWithFacebook = async () => {
		const provider = new FacebookAuthProvider();

		const auth = getAuth();
		signInWithPopup(auth, provider)
			.then((result) => {
				debugger;
				// The signed-in user info.
				const user: any = result.user;
				const val: any = true;

				// This gives you a Facebook Access Token. You can use it to access the Facebook API.
				const credential: any =
					FacebookAuthProvider.credentialFromResult(result);
				const accessToken: any = credential.accessToken;
				if (user) {
					user.getIdToken().then((tkn) => {
						const data: any = JSON.stringify(user);

						localStorage.setItem('token', tkn);
						localStorage.setItem('userData', user);
						localStorage.setItem('social', val);
					});
					setTrFetchUser(true);
					navigate('/');
				}

				// ...
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = FacebookAuthProvider.credentialFromError(error);

				// ...
			});
	};

	const logOut = useCallback(() => {
		_handleLogout.mutate(undefined, {
			onSuccess: (res) => {
				if (res.success) {
					toast.success('logout is succes');
					localStorage.removeItem('token');
					localStorage.removeItem('user');
					localStorage.removeItem('social');
					if (account) {
						disconnect();
					}

					setTrFetchUser(true);
					navigate('/signin');
				}
			},
		});
	}, [account, disconnect]);
	const fetchUser = () => {
		getUser().then((data: any) => {
			const userData: any = JSON.parse(
				JSON.stringify(data?.data ? data?.data : '')
			);
			const level = parseInt(data?.level ? data?.level : '1');
			const progress = parseFloat(data?.levelPercent ? data.levelPercent : '0');
			setLevel(level);
			setLevelProgress(progress);
			setUserId(userData._id ? userData._id : null);
			setEmail(userData.email ? userData.email : null);
		});
	};
	useEffect(() => {
		if (trFetchUser) {
			fetchUser();
			setTrFetchUser(false);
		}
	}, [trFetchUser]);

	const handleLogOut = useCallback(() => {
		const socialToken = localStorage.getItem('social');

		if (socialToken) {
			const auth = getAuth();

			signOut(auth)
				.then(() => {
					//  Sign-out successful.
					logOut();
				})
				.catch((error) => {
					// An error happened.
					toast.error(error?.message);
				});
		} else {
			logOut();
		}
	}, [logOut, signOut]);

	const handleSubmint = async () => {
		try {
			await signup(email, password);

			alert('You have Signin successfully');
			navigate('/');
		} catch (err) {
			// setError("Failed to create an account")
			alert(err);
		}

		// setLoading(false)
	};
	const handleClose = (
		event: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const action = (
		<React.Fragment>
			<Button color='secondary' size='small' onClick={handleClose}>
				UNDO
			</Button>
			<IconButton
				size='small'
				aria-label='close'
				color='inherit'
				onClick={handleClose}
			>
				<CloseIcon fontSize='small' />
			</IconButton>
		</React.Fragment>
	);

	const Value: any = {
		setTrFetchUser,
		user_id,
		country,
		setCountry,
		currentUser,
		handleClose,
		action,
		signup,
		email,
		setEmail,
		open,
		setOpen,
		error,
		setError,
		password,
		setPassword,
		handleSubmint,
		googleSignIn,
		AppleLogin,
		logOut,
		handleLogOut,
		signInWithFacebook,
		imgUrl,
		fullName,
		setFullName,
		setImgUrl,
		levelProgress,
		level: level,
	};

	useEffect(() => {
		const unsubscibe = auth.onAuthStateChanged((user: any) => {
			setCurrentUser(user);
		});
		return unsubscibe;
	}, []);

	return <AuthContext.Provider value={Value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
