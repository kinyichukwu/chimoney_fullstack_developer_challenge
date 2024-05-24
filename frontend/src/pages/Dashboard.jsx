import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { mainListItems } from "../components/dashboard/Listitems";
import { UserContext } from "../contexts/user.context";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import home from "../assets/home.svg";
import person from "../assets/scratching-head.svg";
import minus from "../assets/minus.svg";
import plus from "../assets/plus.svg";

import messageOpen from "../assets/rightbar/menuopen.svg";
import envelope from "../assets/rightbar/envelope.svg";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const { currentUser, userDetails, setUserDetails } =
    React.useContext(UserContext);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Drawer variant="permanent" open={true}>
          <div className="flex flex-col gap-14 py-11 items-center">
            <img src={logo} alt="" className="max-w-[69px] w-full" />
            <List component="nav" className="flex flex-col items-center ">
              {mainListItems}
            </List>
            <div
              className=" pt-[3.11rem] pb-[1.31rem] px-[1.06rem] text-white"
              style={{
                borderRadius: "0.625rem",
                background:
                  "linear-gradient(163deg, #3579DC 23.51%, #95D9FF 93.9%)",
              }}
            >
              <p className="text-base font-bold text-white SourceSansPro">
                GET more with PRO
              </p>

              <p className="text-[1.0625rem] font-normal mt-[.31rem]">
                {" "}
                Upgrade to pro <br /> subscription for $9 <br /> / month
              </p>
            </div>
          </div>
        </Drawer>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
          className="pl-6"
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3} className="">
              <p className="text-[1.9rem] font-semibold text-[#404650] ">
                Trending topics
              </p>
              {/* Recent Deposits */}
              <div className="flex justify-start gap-4 my-6 w-full">
                {" "}
                <CardP />
                <CardP />
              </div>
            </Grid>

            <div className="flex justify-between gap-[4rem]">
              <img src={person} alt={""} className="" />

              <div
                className={`w-full px-[1.94rem] pt-[1.69rem] pb-9 bg-white rounded-2xl 
           items-center gap-[0.69rem] cursor-pointer border-transparent border h-fit`}
              >
                <p className="text-[1.125rem] font-semibold text-[#404650] SourceSansPro">
                  Balances
                </p>
                <p className="text-[2.0625rem] font-semibold text-[#404650] SourceSansPro mb-[1.38rem]">
                  $9,314
                </p>

                <div className="">
                  <Transaction />
                  <Transaction />
                  <Transaction />
                  <Transaction />
                  <Transaction />
                </div>
              </div>
            </div>
          </Container>
        </Box>

        <Drawer variant="permanent" open={true}>
          <div className="flex flex-col gap-14 py-11 pl-3">
            <p className="text-[1.25rem] font-semibold text-[#404650] SourceSansPro">
              History
            </p>

            <div className="">
              <EmailOpened />
              <EmailOpened opened={true} />
              <EmailOpened opened={true} />
              <EmailOpened opened={true} noSticl={true} />
            </div>
          </div>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}

const CardP = () => {
  return (
    <div
      className={`w-full px-[1rem] py-[1.17rem] bg-white rounded-2xl 
       items-center gap-[0.69rem] flex cursor-pointer border-transparent border `}
    >
      <img className="" src={home} alt="" />

      <div className="flex flex-col gap-1">
        {" "}
        <div className="text-[#404650] text-[1.12rem] font-semibold SourceSansPro">
          {" "}
          Hashtag research
        </div>
        <div className=" opacity-50 text-[#404650] text-base font-medium leading-5 ">
          Upgrade to pro subscription for <br /> $9 / month
        </div>
      </div>
    </div>
  );
};

const Transaction = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <p
          className="SourceSansPro"
          style={{
            color: "#404650",
            fontSize: "1rem",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
          }}
        >
          Main account
        </p>

        <div className="flex gap-4 items-center">
          <img src={minus} alt="" />

          <p
            className="SourceSansPro"
            style={{
              color: "#404650",
              fontSize: "1rem",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
            }}
          >
            $413
          </p>
          <img src={plus} alt="" />
        </div>
      </div>

      <hr className="border-[#E5E5E5] w-full my-4" />
    </>
  );
};

const EmailOpened = ({ opened, noSticl }) => {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className={`border ${
            !opened ? "bg-[#3579DC]  border-[#3579DC]" : " border-[#CDD2D4]"
          } p-[.5rem] rounded-full w-fit h-fit`}
        >
          <img
            src={!opened ? messageOpen : envelope}
            alt="w-[0.6875rem] h-[0.6875rem]"
          />
        </div>

        {!noSticl && (
          <div
            className=" "
            style={{
              width: "0rem",
              height: "4.3125rem",
              background: "#CDD2D4",
              border: "1px dotted #CDD2D4",
            }}
          ></div>
        )}
      </div>

      <div className="">
        <p
          className="SourceSansPro"
          style={{
            color: !opened ? "#3579DC" : "#CDD2D4",

            fontSize: "1rem",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "normal",
          }}
        >
          Email opened
        </p>
        <p
          className="SourceSansPro"
          style={{
            color: "#88909C",

            fontSize: "0.75rem",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
          }}
        >
          July 2, 2021 8am
        </p>
      </div>
    </div>
  );
};
