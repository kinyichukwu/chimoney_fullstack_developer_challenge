import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits({}) {
  return (
    <React.Fragment>
      <Title>Wallet</Title>
      <Typography component="p" variant="h4" sx={{ flex: 1 }}>
        $3,024.00
      </Typography>

      <div>
        <Link color="#00D871" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
