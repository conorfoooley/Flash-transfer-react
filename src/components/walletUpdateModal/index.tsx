/** @format */

import * as React from 'react';
import { useCallback } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import close from '../../assests/Images/close.png';
import '../../font.css/index.css';
import A1 from '../../assests/Images/W1.png';
import A2 from '../../assests/Images/W2.png';
import A3 from '../../assests/Images/W3.png';
import A4 from '../../assests/Images/W4.png';
import A5 from '../../assests/Images/W5.png';
import { useWallet } from '../../Context/wallet_context';
import logo5 from '../../assests/Logo/wallet.png';
import { SUPPORTED_WALLETS } from '../../constants/wallet';
import { toast } from 'react-toastify';
import { useLocalStorageState } from '../../hooks';
import {
	signInWithWallet,
	getNonce,
	signUpWithWallet,
	register,
	generateNonceForSignUp,
} from '../../Services/auth';
import { hexEncode, signMessage } from '../../utils';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { useNavigate, useParams } from 'react-router-dom';
import AppButton from '../AppButton';
import { useUpdateWallet } from '../../hooks/useProfile';

export interface AppProps {
	menuicon?: any;
	address: string | null;
}
export default function WalletUpdateModal({ menuicon, address }: AppProps) {
	const { id } = useParams();

	const [open, setOpen] = React.useState(false);
	const [modalOpen, setModalOpen] = React.useState(true);

	const [isUpdate, setIsUpdate] = React.useState<boolean>(false);
	const [walletType, setWalletType] = useLocalStorageState('CONNECTOR_ID', '');
	const { library } = useActiveWeb3React();
	const { connectUserWallet, disConnectUserWallet } = useUpdateWallet();
	const connectWallet = useCallback(
		(connectorId: string) => {
			connectUserWallet(connectorId)
				.then((res: any) => {
					if (res.data?.status) {
						return toast.success('connection is successful');
					} else {
						const message = res.data?.msg;
						return toast.warn(message);
					}
				})
				.catch((error: any) => {
					toast.error(error?.message);
				});
		},
		[connectUserWallet]
	);
	const title = React.useMemo(() => {
		if (address) {
			return 'Disconnect';
		} else return 'Connect';
	}, [address]);
	const navigate = useNavigate();

	const handleClose = () => setOpen(false);

	const data = React.useMemo(
		() => [
			{
				logo: A1,
				name: 'Flash Wallet',
				url: '',
				connecter: () => {},
			},
			{
				logo: A3,
				name: 'Metamask',
				url: '',
				connecter: () => {
					return connectWallet('METAMASK');
				},
			},
			{
				logo: A4,
				name: 'Trust Wallet',
				url: '',
				connecter: () => {
					return connectWallet('TRUST_CONNECT');
				},
			},
			{
				logo: A5,
				name: 'Wallet Connect',
				url: '',
				connecter: () => {
					return connectWallet('WALLET_CONNECT');
				},
			},
		],
		[connectWallet]
	);
	const handleOpen = useCallback(() => {
		if (!address) {
			setOpen(true);
		} else {
			disConnectUserWallet()
				.then((res: any) => {
					if (res.data?.status) {
						return toast.success('Disconnection is successful');
					} else {
						const message = res.data?.msg;
						return toast.warn(message);
					}
				})
				.catch((error: any) => {
					toast.error(error?.message);
				});
		}
	}, [address, connectUserWallet, disConnectUserWallet]);
	return (
		<div>
			<Box sx={{ display: { lg: 'flex', xs: 'none' } }}>
				<AppButton
					title={title}
					textTransform='none'
					backgroundColor={'white'}
					color={'#000000'}
					fontSize={'20px'}
					fontWeight={'500'}
					lineHeight={'30px'}
					borderRadius={'8px'}
					border={'1px solid #979797'}
					onClick={handleOpen}
				/>
			</Box>
			<Box sx={{ display: { lg: 'none', xs: 'flex' } }}>
				<AppButton
					title={title}
					backgroundColor={'white'}
					color={'#000000'}
					fontSize={'16px'}
					fontWeight={'500'}
					lineHeight={'24px'}
					borderRadius={'8px'}
					height='42px'
					textTransform='none'
					border={'1px solid #979797'}
					letterSpacing={'0.02em'}
					startIcon={
						<img
							src={logo5}
							alt='image'
							style={{ width: '20px', height: '20px' }}
						/>
					}
					onClick={handleOpen}
				/>
			</Box>
			<Modal
				aria-labelledby='transition-modal-title'
				open={open}
				onClick={handleClose}
				BackdropComponent={Backdrop}
				closeAfterTransition
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<Box
						sx={{
							position: 'absolute',
							height: { md: '378px', xs: '278px' },
							top: { md: '275px', xs: '190px' },
							left: { md: '68%', xs: '60%' },
							transform: 'translate(-50%, -50%)',
							width: { md: '412px', xs: '267px' },
							bgcolor: 'background.paper',
							boxShadow: '0px 5px 30px rgba(0, 0, 0, 0.15) ',
							padding: '0px 30px',
							borderRadius: '14px',
						}}
					>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'end',
							}}
						>
							<Button
								sx={{
									display: { md: 'flex', xs: 'none' },
								}}
								onClick={handleClose}
								endIcon={<img src={close} style={{ marginTop: '22px' }} />}
							/>
						</Box>

						<Box
							sx={{
								marginTop: { md: '10px', xs: '-1px' },
								// paddingTop: {md:"0px",xs:"20px"},

								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<Typography
								sx={{
									display: { md: 'flex', xs: 'none' },

									textAlign: 'center',
									padding: '0px 0px 10px  0px',
									fontWeight: '800  !important',
									fontSize: '24px  !important',
									lineHeight: '32px  !important',
									fontFamily: 'Inter !important',
								}}
							>
								Wallet
							</Typography>
							{data.map((i) => {
								return (
									<Box
										onClick={() => {
											i.connecter();
											setIsUpdate(true);
										}}
										sx={{
											borderTop: '0.5px solid #6A6A6A',
											display: 'flex',
											alignItems: 'center',
											flexDirection: 'row',
											// justifyContent: "center",
											padding: {
												md: '13px 10px',
												xs: '18px 10px',
											},
										}}
									>
										<img src={i.logo} />
										<Typography
											sx={{
												padding: '0px 15px',
												fontWeight: '400  !important',
												fontSize: '16px  !important',
												lineHeight: '24px  !important',
												fontFamily: 'Inter !important',
											}}
										>
											{i.name}
										</Typography>
									</Box>
								);
							})}
						</Box>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
