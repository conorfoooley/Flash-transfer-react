/** @format */

import { useCallback } from 'react';
import { useLocalStorageState } from '.';
import { useWallet } from '../Context/wallet_context';
import { getNonce, signInWithWallet } from '../Services/auth';
import { signMessage } from '../utils';
import useActiveWeb3React from './useActiveWeb3React';

export function useWalletLogin() {
	const { account, connect, disconnect } = useWallet();
	const { library } = useActiveWeb3React();

	const walletLogin = useCallback(
		async (connectorId: string) => {
			if (!account) return connect(connectorId);
			if (!library) return;
			return getNonce({ pub_addr: account })
				?.then((msg: any) => {
					return signMessage(library, account, msg);
				})
				.then((signature: any) => {
					return signInWithWallet({ signature, pub_addr: account });
				});
		},
		[account, library]
	);

	return walletLogin;
}
