/** @format */
import { useMutation, useQuery } from '@tanstack/react-query';
import Axios from '../Services/axios';
import config from '../Services/apisConfig';
import { useCallback } from 'react';
import { useWallet } from '../Context/wallet_context';
import { useLocalStorageState } from '.';
import useActiveWeb3React from './useActiveWeb3React';
import { generateNonceForSignUp, getNonce } from '../Services/auth';
import { hexEncode, signMessage } from '../utils';
import { toast } from 'react-toastify';
export interface BackendResponse {
	status: boolean;
	msg?: string;
}
export interface ResponseUserType extends BackendResponse {
	data?: {
		pub_addr?: string;
		_id: string;
		firstName?: string;
		lastName?: string;
		presentAddress?: string;
		permenantAddress?: string;
		phone?: string;
		dob?: string;
		city?: string;
		postalCode?: string;
		country?: string;
		email?: string;
		profileImg?: string;
		isCreatedByWallet?: boolean;
	};
	level: number;
	leverlPercent: number;
	statusCode: number;
	statusDesc: string;
}
export type UpdateWalletType = {
	signature: string;
	pub_addr: string;
};

export interface ResponseLogout extends BackendResponse {
	success: boolean;
}
export default function useProfile() {
	return useQuery([config.session.getSession], () => fetchUser());
}
export function useLogout() {
	return useMutation(logout, {
		onError: (error: any) => {
			toast.error(error?.message);
		},
	});
}
export function fetchUser(): Promise<ResponseUserType> {
	const endpoint = config.session.getSession;
	return Axios.get(endpoint).then((res) => res.data);
}

export function useUpdateWallet() {
	const { account, connect, disconnect } = useWallet();
	const { library } = useActiveWeb3React();
	const [walletType, setWalletType] = useLocalStorageState('CONNECTOR_ID', '');
	const connectUserWallet = useCallback(
		async (connectorId: string) => {
			if (!account) return connect(connectorId);
			if (!library) return;
			return generateNonceForSignUp()
				?.then((msg: any) => {
					return signMessage(library, account, msg);
				})
				.then((signature: any) => {
					return updateWallet({ signature, pub_addr: account });
				});
		},
		[account, library]
	);
	const disConnectUserWallet = useCallback(async () => {
		if (!account) return connect(walletType);
		if (!library) return;
		return getNonce({ pub_addr: account })
			.then((nonce: any) => {
				const msg = hexEncode(`I am signing my one-time nonce: ${nonce}`);
				return signMessage(library, account, '0x' + msg);
			})
			.then((signature: any) => {
				return unBindWallet({ signature, pub_addr: account });
			});
	}, [walletType, account, library]);
	return { connectUserWallet, disConnectUserWallet };
}

export function updateWallet(payload: UpdateWalletType) {
	const endpoint = config.auth.updateWallet;
	return Axios.post(endpoint, payload);
}
export function unBindWallet(payload: UpdateWalletType) {
	const endpoint = config.auth.unbindWallet;
	return Axios.post(endpoint, payload);
}
export const DisconnectWallet = () => {};
export const logout = (): Promise<ResponseLogout> => {
	const endpoint = config.auth.logout;
	return Axios.post(endpoint, {}).then((res) => res.data);
};
export const Walletlogin = (payload) => {
	const endpoint = config.auth.walletLogin;
	return Axios.post(endpoint, payload);
};
