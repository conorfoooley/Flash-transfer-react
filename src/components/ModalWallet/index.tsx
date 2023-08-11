/** @format */

import * as React from 'react';
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
import { toast } from 'react-toastify';

import { IconButton } from '@mui/material';
import AppButton from '../AppButton';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { getNonce, signInWithWallet } from '../../Services/auth';
import { hexEncode, signMessage } from '../../utils';
import { useAuth } from '../../Context/globaltContext';
import { useNavigate } from 'react-router-dom';
export interface AppProps {
	menuicon?: any;
	namesize?: any;
	name?: any;
	width?: any;
	priceimg1?: any;
}
export default function ModalWallet({
	menuicon,
	priceimg1,
	width,
	namesize,
	name,
}: AppProps) {
	const [open, setOpen] = React.useState(false);
	const [trConnect, setTrConnect] = React.useState<boolean>(false);
	const [modalOpen, setModalOpen] = React.useState(true);
	const { account, connect, disconnect } = useWallet();
	const { library } = useActiveWeb3React();
	const { setTrFetchUser } = useAuth();
	const navigate = useNavigate();
	const connectMetamask = () => {
		if (account) {
		} else {
			connect('METAMASK');
		}
	};
	const connectBinance = () => {
		if (account) {
		} else {
			connect('BSC_CONNECT');
		}
	};
	const connectTrustWallet = () => {
		if (account) {
		} else {
			connect('TRUST_CONNECT');
		}
	};
	const WalletConnect = () => {
		if (account) {
		} else {
			connect('WALLET_CONNECT');
		}
	};
	const handleDisconnect = () => {
		disconnect();
	};
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const data = [
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
				connectMetamask();
			},
		},
		{
			logo: A4,
			name: 'Trust Wallet',
			url: '',
			connecter: () => {
				connectTrustWallet();
			},
		},
		{
			logo: A5,
			name: 'Wallet Connect',
			url: '',
			connecter: () => {
				WalletConnect();
			},
		},
	];
	const SignInWithWallet = React.useCallback(() => {
		if (!account) {
			setOpen(true);
			return;
		}
		if (!library) {
			toast.warn('web3 provider is not connected!');
			return;
		}
		if (account && library) {
			setTrConnect(false);
			getNonce({ pub_addr: account })
				.then((nonce: any) => {
					const msg = hexEncode(`I am signing my one-time nonce: ${nonce}`);

					return new Promise((resolve: any, reject: any) => {
						signMessage(library, account, '0x' + msg)
							.then((res: any) => {
								resolve(res);
								setTrConnect(false);
							})
							.catch((error) => {
								setTrConnect(false);
								reject(error);
							});
					});
				})
				.then((signature: any) => {
					setTrConnect(false);
					return signInWithWallet({ pub_addr: account, signature: signature });
				})
				.then((res: any) => {
					setTrConnect(false);
					setTrFetchUser(true);
					navigate('/');
				})
				.catch((error: any) => {
					if (error?.response?.data?.error) {
						toast.error(error?.response?.data?.error);
					}
					disconnect();
					setTrConnect(false);
				});
		}
	}, [account, library]);
	React.useEffect(() => {
		if (trConnect && account && library) {
			SignInWithWallet();
		}
	}, [trConnect, account, library]);
	return (
		<div>
			{priceimg1 ? (
				<AppButton
					title={name}
					fontSize={namesize ? namesize : '24px'}
					backgroundColor='#5D5FEF'
					fontWeight={'400'}
					lineHeight={'32px'}
					color={'#fff'}
					width={width}
					textTransform='none'
					height='56px'
					boxShadow={'0px 1px 2px rgba(0, 0, 0, 0.05)'}
					padding='13px 19px'
					borderRadius={'9px'}
					onClick={handleOpen}
					startIcon={<img src={priceimg1} alt='image' />}
				/>
			) : // <IconButton
			//   sx={{
			//     fontSize: namesize ? namesize : "24px",
			//     color: "#FFFFFF",
			//     width: width,
			//     backgroundColor: "#5D5FEF",
			//     borderRadius: "8px",
			//     height: "56px",
			//     padding: "13px 19px",
			//     textTransform: "none",
			//     boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
			//     fontWeight: "700px",
			//     lineHeight: "32px",
			//   }}
			//   onClick={handleOpen}
			// // menuicon={
			// // }
			// >
			//   <img
			//     src={priceimg1}
			//     alt=""
			//     style={{ marginRight: "10px" }}
			//   />
			//   {name}
			// </IconButton>

			null}
			<IconButton onClick={handleOpen}>{menuicon}</IconButton>
			<Modal
				aria-labelledby='transition-modal-title'
				open={open}
				onClick={handleClose}
				BackdropComponent={Backdrop}
				// hideBackdrop={true}
				closeAfterTransition
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<Box
						sx={{
							cursor: 'pointer',
							position: 'absolute',
							height: { md: '378px', xs: '278px' },
							top: { md: '275px', xs: '190px' },
							left: { md: '68%', xs: '60%' },
							transform: 'translate(-50%, -50%)',
							width: { md: '412px', xs: '267px' },
							bgcolor: 'background.paper',
							boxShadow: '0px 5px 30px rgba(0, 0, 0, 0.15) ',
							padding: '0px 30px',
							// display: "flex",
							// flexDirection: "row-reverse",
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
							{data.map((i, key) => {
								return (
									<Box
										key={key}
										onClick={() => {
											i.connecter();
											setTrConnect(true);
										}}
										sx={{
											borderTop: '0.5px solid #6A6A6A',
											display: 'flex',
											alignItems: 'center',
											flexDirection: 'row',
											// justifyContent: "center",
											padding: { md: '13px 10px', xs: '18px 10px' },
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
											{/* <Link
                        to={i.url}
                        style={{
                          textDecoration: "none",
                          color: `${i.color}`,
                          fontSize: "",
                        }}
                      >
                       
                      </Link> */}
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
