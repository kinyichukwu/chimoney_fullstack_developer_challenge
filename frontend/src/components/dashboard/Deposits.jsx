import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { Fragment, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { BeatLoader } from "react-spinners";

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits({}) {
  const { userDetails } = useContext(UserContext);
  return (
    <Fragment>
      <Title>Wallet</Title>
      <Typography component="p" variant="h4" sx={{ flex: 1 }}>
        {" "}
        {userDetails?.balance || userDetails?.balance == 0 ? (
          " $" + userDetails?.balance?.toLocaleString() + ".00"
        ) : (
          <BeatLoader size={20} color={"#00D871"} />
        )}
      </Typography>

     
    </Fragment>
  );
}
