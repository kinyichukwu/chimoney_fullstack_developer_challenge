import React, { useState } from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { Input } from "../auth/input";
import { getName } from "../../utils/helper";

function preventDefault(event) {
  event.preventDefault();
}

const defaultValue = {
  transfer_amount: "",
};

const Send = () => {
  const [formField, setFormField] = useState(defaultValue);
  const [state, setstate] = useState("unloaded");

  return (
    <React.Fragment>
      <Title>Transfer</Title>
      {Object.keys(formField).map((key) => {
        return (
          <Input
            name={getName(key)}
            type={
              key == "password" || key == "confirm_password"
                ? "password"
                : "text"
            }
            value={formField[key]}
            placeholder={"Input users name or email address"}
            onChange={(e) => {
              setFormField((prev) => ({
                ...prev,
                [key]: e.target.value,
              }));
            }}
          />
        );
      })}

      <Typography component="p" variant="h4" sx={{ flex: 1 }}></Typography>

      <div>
        {state == "loading" ? (
          <ClipLoader color="#00D871" loading={true} size={30} />
        ) : (
          <Link color="#00D871" href="#" onClick={preventDefault}>
            Transfer
          </Link>
        )}
      </div>
    </React.Fragment>
  );
};

export default Send;
