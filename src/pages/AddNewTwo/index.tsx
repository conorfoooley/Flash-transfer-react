import {
  FormControl,
  Grid,
  Typography,
} from "@mui/material";
import sett from "../../assests/Images/sett.png";
import "../../font.css/index.css"
import wallet from "../../assests/Images/waallet.png";
import notification from "../../assests/Images/notification.png";
import user from "../../assests/Images/User.png";
import { useForm } from "react-hook-form";
import priceimg2 from "../../assests/Images/arrow.png";
import priceimg1 from "../../assests/Images/btnB.png";
import React, { useState } from "react";
import { styled } from '@mui/material/styles';

import Radio, { RadioProps } from '@mui/material/Radio';
import right from "../../assests/Images/blueright.png";
import right2 from "../../assests/Images/gray4.png";
import two from "../../assests/Images/two.png";
import three from "../../assests/Images/gray3.png";
import carve from "../../assests/Images/carve.png";
import CommonNav from "../../components/CommonNav";
import Layout from "../../components/Layout";
import MiniHeader from "../../components/MiniHeader";
import Footer from "../../components/AppFooter";
import { useStyles } from "../../Styles";
import { Box } from "@mui/system";
import AppButton from "../../components/AppButton";
import Tabhs from "../../components/TabhCard";
import { Link } from "react-router-dom";
export interface AppProps {
  event?: any;
  value?: any;

}
type InputForm = {
  email: string,
  password: string
}
const AddnewTwo = () => {
  const classes = useStyles();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<InputForm>();
  const [linkflow, setLinkflow] = useState("/ReviewandDetail")
  const [bgs, setbg] = useState(false)
  const [bgs2, setbg2] = useState(false)
  const [bgs3, setbg3] = useState(false)
  const [bgs4, setbg4] = useState(false)
  const [value, setval] = useState()
  const [cash, setCash] = useState()
  const [crypto, setCrypto] = useState()
  const [credit, setcredit] = useState()
  const [btransfer, setBtransfer] = useState()

  console.log("eeee", credit)

  const seTNewurl = () => {

    if (cash == "cash") {
      setLinkflow("/framecash")
    }
    else if (crypto == "crypto") {

      setLinkflow("/throught")

    }
    else if (credit == "credit/debit") {
      setLinkflow("/paymentmethod")

    }
    else if (btransfer == "bank") {

      setLinkflow("/banktransfer")

    }

    else {
      setLinkflow("/addnewtwo")
    }
  }
  const getValue = (e: any) => {
    setCash(e.target.value)
  }
  console.log()
  const getValue2 = (e: any) => {

    setCrypto(e.target.value)

  }
  const getValue3 = (e: any) => {
    setcredit(e.target.value)

  }
  const getValue4 = (e: any) => {
    setBtransfer(e.target.value)
  }
  const data = [
    {
      name: "Pay in cash",
      des: "Few seconds.",
      ids: "espresso",
      value: "Espresso",
      data: "Espresso",
      mainid: "espresso",
      // value: {bg2},
      color: "#312E81",
      // tougle: tougle1,
      subcolor: "#4338CA",

      // backgroundColor:  `${bgs === false ? "#fff" : "#EEF2FF"}`,
      border: "1px solid #E5E7EB",
      radius: "0px 0px 6px 6px ",
    },

    {
      ids: "espresso",
      value: "Espresso",
      data: "Espresso",
      mainid: "espresso",
      // value: "value3",
      // tougle: tougle3,
      name: "Credit Card/Debit Card",
      des: "2 minute transfer by deducting 2EUR transfer fee.",
      color: "#111827",
      backgroundColor: "#FFFF",
      subcolor: "#6B7280",
      border: "1px solid #E5E7EB",
      radius: "0px 0px 6px 6px ",
    },
    {
      value: "value4",
      // tougle: tougle4,
      name: "Bank transfer",
      des: "1 day to 3 days transfer by deducting 1EUR transfer fee.",
      backgroundColor: "#FFFF",

      color: "#111827",
      subcolor: "#6B7280",
      border: "1px solid #E5E7EB",
      Radius: "0px 0px 6px 6px ",
    },
  ];
  const dataTwo = [
    {
      name: "Cash Pickup ",
      des: "Directly withdraw in cash from a Flash partner.",
      // color: "#111827",
      ids: "espresso",
      // values: val,
      data: "Espresso",
      mainid: "espresso",

      // subcolor: "#6B7280",
    },
    {
      mainid: "filter",
      name: "Bank transfer",
      ids: "filter",
      // values: val,
      data: "Filter",
      des: "1 day to 3 days transfer by deducting 1EUR transfer fee.",

    },
    // {
    //   name: "Pay cash at a merchant",
    //   des: "Few seconds.",
    //   // color: "#111827",
    //   // subcolor: "#6B7280",
    // },
  ];
  const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 0 0 1px rgb(16 22 26 / 40%)'
        : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
    backgroundImage:
      theme.palette.mode === 'dark'
        ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
        : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background:
        theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
    },
  }));
  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },

  });
  const changebg = () => {
    setbg(true)
    setbg2(false)
    setbg3(false)
    setbg4(false)
  };
  const changebg2 = () => {
    setbg(false)
    setbg2(true)
    setbg3(false)
    setbg4(false)

  };
  const changebg3 = () => {
    setbg(false)
    setbg2(false)
    setbg3(true)
    setbg4(false)
  };
  const changebg4 = () => {
    setbg(false)
    setbg2(false)
    setbg3(false)
    setbg4(true)
  };
  // function BpRadio(props: RadioProps) {
  //   return (
  //     <Radio
  //       sx={{
  //         '&:hover': {
  //           bgcolor: 'transparent',
  //         },
  //       }}
  //       disableRipple
  //       color="default"
  //       checkedIcon={<BpCheckedIcon />}
  //       icon={<BpIcon />}
  //       {...props}
  //     />
  //   );
  // }
  return (
    <>
      <Layout>
        {/* <Box>
        <CommonNav priceimg1={priceimg1} priceimg2={priceimg2} img3={sett} img1={wallet} img4={user} img2={notification} name="100$" />
      </Box> */}
        <Box sx={{ transform: { lg: "scale(0.9)", xs: "scale(none)" }, }}>
          <MiniHeader />
        </Box>
        <Grid container>
          <Grid
            item
            xs={12}
            md={12}
            sx={{
              backgroundColor: "#F7FDFF",
              display: "flex",
              justifyContent: "center",
              borderTop: "1px solid  #D1D5DB",
              borderBottom: "1px solid  #D1D5DB",
            }}
          >
            <Grid
              item
              md={10.2}
              xs={12}
              sx={{
                marginBottom: { lg: "-4px", xs: "0px" },

                transform: { lg: "scale(0.9)", xs: "scale(none)" },
                borderRight: "1px solid  #D1D5DB",
                borderLeft: "1px solid  #D1D5DB",
                // borderHeight:"5px",
                display: "flex",
                flexDirection: { md: "row", sm: "row", xs: "column" },
              }}
            >
              <Grid md={3} sx={{ display: { md: "flex", xs: "none" } }}>
                <Tabhs
                  img={carve}
                  imgright={right}
                  color="black"
                  text="Reciver’s info"
                />
              </Grid>
              <Grid md={3} sx={{
                borderBottom: "3px solid  #4F46E5",
                display: { md: "flex", xs: "flex" }
              }}>
                <Tabhs

                  img={carve}
                  imgright={two}
                  color="black"
                  text="Payment Method"
                />
              </Grid>
              <Grid md={3} sx={{ display: { md: "flex", xs: "none" } }}>
                <Tabhs
                  img={carve}
                  imgright={three}
                  color="black"
                  text="Review & Confirm"
                />
              </Grid>
              <Grid md={3} sx={{ display: { md: "flex", xs: "none" } }}>
                <Tabhs
                  img={carve}
                  imgright={right2}
                  text="reCeipt"
                  color="#4F46E5"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            display: "flex",
            backgroundColor: "#F7FDFF",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Grid
            item
            md={10.7}
            xs={12}
            sx={{
              transform: { lg: "scale(0.9)", xs: "scale(none)" },
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
            }}
          >
            <Grid item md={4} xs={12} sx={{ marginTop: { lg: "56px", xs: "0px" }, padding: { lg: "20px", xs: "20px 10px" } }}>
              <Typography className={classes.qa}>
                How would you like to pay ?
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={8}
              sx={{
                height: "1,108px",
                margin: { md: "56px 0px 0px 0px" },
                padding: { md: "15px" },
              }} >
              <Box component="label"
                sx={{
                  display: "flex",
                  border: "1px solid #E5E7EB",
                  // backgroundColor: `${i.backgroundColor} `,
                  borderRadius: "0px 0px 6px 6px ",
                  padding: "10px 15px",

                  backgroundColor: `${bgs === false ? "#fff" : "#EEF2FF"}`,
                  flexDirection: "row",
                  '&:hover': {
                    backgroundColor: { md: "#EEF2FF", xs: "#EEF2FF" },
                  },
                }}
                // className={classes.lableinput2}
                onClick={changebg}  >
                <FormControl   >
                  <input type="radio"
                    value="cash"
                    // id={i.ids}
                    {...register("email", { required: 'Trade type is required' })}
                    onChange={getValue}
                    // data-preference={i.data}
                    style={{ width: "18px", height: "18px", margin: "5px 20px 0px 0px" }}
                  />
                </FormControl>
                <Box sx={{ marginLeft: { lg: "0px", xs: "0px" } }}>
                  <Typography sx={{
                    color: "#111827",
                    '&:hover': {
                      color: "#312E81",
                    },
                  }}>
                    Pay in cash
                  </Typography>
                  <Typography
                    sx={{
                      color: "#6B7280",
                      '&:hover': {
                        color: "#4338CA",
                      },
                    }}
                  >
                    "Few seconds."
                  </Typography>
                </Box>
              </Box>
              <Box component="label"
                sx={{
                  display: "flex",
                  border: "1px solid #E5E7EB",
                  // backgroundColor: `${i.backgroundColor} `,
                  borderRadius: "0px 0px 6px 6px ",
                  padding: "10px 15px",

                  backgroundColor: `${bgs2 === false ? "#fff" : "#EEF2FF"}`,
                  flexDirection: "row",
                  '&:hover': {
                    backgroundColor: { md: "#EEF2FF", xs: "#EEF2FF" },
                  },
                }}
                // className={classes.lableinput2}
                onClick={changebg2}
              >

                <FormControl
                >
                  <input type="radio"
                    value="crypto"
                    {...register("email", { required: 'Trade type is required' })}
                    onChange={getValue2}
                    // data-preference={i.data}
                    style={{ width: "18px", height: "18px", margin: "5px 20px 0px 0px" }}


                  />

                </FormControl>
                <Box sx={{ marginLeft: { lg: "0px", xs: "0px" } }}>
                  <Typography sx={{
                    color: "#111827",
                    '&:hover': {
                      color: "#312E81",

                    },
                  }}>

                    In cryptocurrency (Flash wallet, Metamask ...)
                  </Typography>
                  <Typography
                    sx={{
                      color: "#6B7280",
                      '&:hover': {
                        color: "#4338CA",
                      },
                    }}
                  >
                    "Few seconds."
                  </Typography>
                </Box>


              </Box>
              <Box component="label"
                sx={{
                  display: "flex",
                  // backgroundColor: `${i.backgroundColor} `,
                  padding: "10px 15px",
                  border: "1px solid #E5E7EB",
                  borderRadius: "0px 0px 6px 6px ",
                  backgroundColor: `${bgs3 === false ? "#fff" : "#EEF2FF"}`,
                  flexDirection: "row",
                  '&:hover': {
                    backgroundColor: { md: "#EEF2FF", xs: "#EEF2FF" },
                  },
                }}
                onClick={changebg3}
              // className={classes.lableinput2}
              >
                <FormControl  >
                  <input type="radio"
                    value="credit/debit"
                    {...register("email", { required: 'Trade type is required' })}
                    // onChange={((e) => {
                    //   setLinkflow("/frame")
                    // })}
                    onChange={getValue3}
                    // id="credit/debit"
                    // data-preference="credit/debit"
                    style={{ width: "18px", height: "18px", margin: "5px 20px 0px 0px" }}
                  />  </FormControl>
                <Box sx={{ marginLeft: { lg: "0px", xs: "0px" } }}>
                  <Typography sx={{
                    color: "#111827",
                    '&:hover': {
                      color: "#312E81",

                    },
                  }}>  Credit Card/Debit Card
                  </Typography>
                  <Typography
                    sx={{
                      color: "#6B7280",
                      '&:hover': {
                        color: "#4338CA",
                      },
                    }}
                  >
                    2 minute transfer by deducting 2EUR transfer fee.
                  </Typography>
                </Box>
              </Box>
              <Box component="label"
                sx={{
                  display: "flex",
                  border: "1px solid #E5E7EB",
                  // backgroundColor: `${i.backgroundColor} `,
                  borderRadius: "0px 0px 6px 6px ",
                  padding: "10px 15px",

                  backgroundColor: `${bgs4 === false ? "#fff" : "#EEF2FF"}`,
                  flexDirection: "row",
                  '&:hover': {
                    backgroundColor: { md: "#EEF2FF", xs: "#EEF2FF" },
                  },
                }}
                onClick={changebg4}
              // className={classes.lableinput2}
              >
                <FormControl    >
                  <input type="radio"
                    value="bank"
                    {...register("email", { required: 'Trade type is required' })}
                    // id={i.ids}
                    // data-preference={i.data}
                    onChange={getValue4}

                    style={{ width: "18px", height: "18px", margin: "5px 20px 0px 0px" }}
                  />
                </FormControl>
                <Box sx={{ marginLeft: { lg: "0px", xs: "0px" } }}>
                  <Typography sx={{
                    color: "#111827",
                    '&:hover': {
                      color: "#312E81",
                    },
                  }}>

                    Bank transfer
                  </Typography>
                  <Typography
                    sx={{
                      color: "#6B7280",
                      '&:hover': {
                        color: "#4338CA",
                      },
                    }}
                  >
                    1 day to 3 days transfer by deducting 1EUR transfer fee.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid
            item
            md={10.7}
            xs={12}
            sx={{
              transform: { lg: "scale(0.9)", xs: "scale(none)" },
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
            }}
          >
            <Grid item md={4} xs={12} sx={{ marginTop: { lg: "56px", xs: "0px" }, padding: { lg: "20px", xs: "20px 10px" } }}>
              <Typography className={classes.qa}>
                How does your receiver want money ?
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={8}
              sx={{
                height: "1,108px",
                margin: { md: "0px 0px 196px 0px", xs: "-40px 10px 20px 10px" },
                padding: { md: "15px" },
              }}
            >
              <Box mt="41px" >
                <label
                  className={classes.lableinput}   >
                  <Box
                    onClick={seTNewurl}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}    >
                    <input type="radio"
                      {...register("password", { required: 'Trade type is required' })}
                      // id={i.ids}
                      onChange={((event: any) => {
                        setval(event.target.value)
                      })}
                      // data-preference={i.data}
                      value="value"
                      // name="preferences"
                      style={{ width: "18px", height: "18px", margin: "5px 20px 0px 0px" }}
                    />   <Box>
                      <Typography sx={{
                        fontFamily: "Inter !important",
                        fontWeight: "500 !important",
                        fontSize: "14px !important",
                        lineHeight: "20px !important",
                        color: "#111827",
                        '&:hover': {
                          color: "#312E81",

                        },
                      }}>
                        Cash Pickup
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Inter !important",
                          fontWeight: "500 !important",
                          fontsize: "14px !important",
                          lineHeight: "20px !important",
                          color: "#6B7280",

                          '&:hover': {
                            color: "#4338CA",
                          },
                        }}
                      >
                        Directly withdraw in cash from a Flash partner.
                      </Typography>
                    </Box>
                  </Box>
                </label>
                <label
                  className={classes.lableinput}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}

                  >
                    <input type="radio"

                      {...register("password", { required: 'Trade type is required' })}
                      onChange={((event: any) => {
                        setval(event.target.value)
                      })}
                      value="value"
                      // id={i.ids}
                      // data-preference={i.data}
                      // name="preferences"
                      style={{ width: "18px", height: "18px", margin: "5px 20px 0px 0px" }}
                    />


                    <Box>
                      <Typography sx={{
                        fontFamily: "Inter !important",
                        fontWeight: "500 !important",
                        fontSize: "14px !important",
                        lineHeight: "20px !important",
                        color: "#111827",
                        '&:hover': {
                          color: "#312E81",

                        },
                      }}>
                        Bank transfer
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Inter !important",
                          fontWeight: "500 !important",
                          fontsize: "14px !important",
                          lineHeight: "20px !important",
                          color: "#6B7280",
                          '&:hover': {
                            color: "#4338CA",
                          },
                        }}
                      >
                        1 day to 3 days transfer by deducting 1EUR transfer fee.
                      </Typography>
                    </Box>
                  </Box>

                </label>
                <label
                  className={classes.lableinput}   >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <input type="radio"
                      {...register("password", { required: 'Trade type is required' })}
                      onChange={((event: any) => {
                        setval(event.target.value)
                      })}
                      value="value"
                      // id={i.ids}
                      // data-preference={i.data}
                      // name="preferences"
                      style={{ width: "18px", height: "18px", margin: "5px 20px 0px 0px" }}
                    />
                    <Box>
                      <Typography sx={{
                        fontFamily: "Inter !important",
                        fontWeight: "500 !important",
                        fontSize: "14px !important",
                        lineHeight: "20px !important",
                        color: "#111827",
                        '&:hover': {
                          color: "#312E81",
                        },
                      }}>
                        In cryptocurrency (Flash wallet, Metamask ...)                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Inter !important",
                          fontWeight: "500 !important",
                          fontsize: "14px !important",
                          lineHeight: "20px !important",
                          color: "#6B7280",
                          '&:hover': {
                            color: "#4338CA",
                          },
                        }}
                      >
                        "Few seconds."
                      </Typography>
                    </Box>
                  </Box>
                </label>
              </Box>
              <Box
                sx={{
                  marginRight: { lg: "0px", xs: "10px" },
                  marginTop: { lg: "58px", xs: "0px" },
                  display: "flex",
                  justifyContent: "end",
                }}
              >   <Link to="/addnew" style={{ textDecoration: "none", width: "142px" }}>
                  <AppButton
                    title={"Cancel"}
                    textTransform="none"
                    color={"#FFFFFF"}
                    maxWidth={"142px"}
                    width={"142px"}
                    backgroundColor={"#6A6A6A"}
                    fontSize={"14px"}
                    fontWeight={"500"}
                    lineHeight={"20px"}
                    padding="9px 17px"
                    border="1px solid #6A6A6A"
                    borderRadius="6px"
                    height="38px"
                    margin={"0px 0px 0px 10px"}
                  />
                </Link>
                <Link to={linkflow} style={{ textDecoration: "none", width: "142px" }}>
                  <Box sx={{ marginLeft: { md: "10px", xs: "10px" } }}>
                    <AppButton
                      title="Continue"
                      color={"#FFFFFF"}
                      maxWidth="142px"
                      textTransform="none"
                      padding="9px 17px"
                      width="142px"
                      backgroundColor={"#5D5FEF"}
                      fontSize={"14px"}
                      fontWeight={"500"}
                      lineHeight={"20px"}
                      height="38px"
                      borderRadius="6px"
                      margin={"0px 0px 0px 10px"}
                    />

                  </Box>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid>
        <Footer />
      </Grid> */}
      </Layout >
    </>
  );
};
export default AddnewTwo;