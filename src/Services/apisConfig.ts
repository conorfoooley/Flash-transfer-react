/** @format */

// export const baseUrl =
// 	process.env.REACT_APP_DEV_PROXY || 'http://213.136.86.184';
// const baseUrl = 'http://localhost:8000';
// export const baseUrl = "https://flash-transfer-master.herokuapp.com";
export const baseUrl = "https://flash-transfer.com";

const config = {
	session: {
		getSession: '/api/session',
	},
	auth: {
		login: '/api/user-login',
		social: '/api/social-login',
		register: '/api/users',
		walletLogin: '/api/walletLogin',
		walletSignup: '/api/walletSignup',
		getNonce: '/api/nonce',
		generateNonce: '/api/generateNonce',
		updateWallet: '/api/updateWallet',
		unbindWallet: '/api/unBindWallet',
		logout: '/api/logout',
	},
	post: {
		addPost: '/api/create-post',
		getPosts: '/api/get-posts',
	},
	category: {
		addCategory: `/api/create-category`,
		getCategory: `/api/get-categories`,
	},
	banner: {
		createBanner: '/api/create-banner',
		getBanner: '/api/get-banners',
	},
	location: {
		districts: '/api/get-districts',
	},
	user: {
		update: '/api/update-user',
	},

	Notification: {
		createNotification: '/api/create-Notifications',
		getNotification: '/api/get-Notifications',
	},
	trackLocation: {
		createTrackLocation: '/api/create-trackLocation',
	},
	findLocation: {
		getfindLocation: '/api/get-findLocation',
	},
	History: {
		createHistory: '/api/create-History',
		getHistory: '/api/get-logs',
	},
	Contact: {
		createContact: '/api/contactus',
		getContact: '/api/get-Contact',
	},

	forgotpassword: {
		restPassword: '/api/forgot-password',
		changePassword: '/api/change-password',
	},
	verified: {
		verified: '/api/email-verify',
	},
	usersRole: {
		getUsersRole: '/api/users-role',
	},
	otpAuth: {
		sendOtp: '/api/send-otp',
		verifyOtp: '/api/verify-otp',
	},
};
export default config;
