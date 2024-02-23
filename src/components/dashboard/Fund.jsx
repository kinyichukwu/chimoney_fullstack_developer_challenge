import React, { useContext, useState } from "react";
import Title from "./Title";
import { Link, Typography } from "@mui/material";
import { Input } from "../auth/input";
import { getName } from "../../utils/helper";
import { ClipLoader } from "react-spinners";
import { fundAccount } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";

function preventDefault(event) {
  event.preventDefault();
}

const defaultValue = {
  fund_amount: "",
};

const Fund = () => {
  const [formField, setFormField] = useState(defaultValue);
  const [state, setstate] = useState("unloaded");
  const {currentUser, userDetails, setUserDetails} = useContext(UserContext)

  return (
    <React.Fragment>
      <Title>Fund</Title>

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
            placeholder={"Input amount in USD"}
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
          <Link
            color="#00D871"
            href="#"
            onClick={(e) => {
              preventDefault(e);
              fundAccount(currentUser,setUserDetails,  formField.fund_amount, setstate, defaultValue, setFormField);
            }}
          >
            Fund Wallet
          </Link>
        )}
      </div>
    </React.Fragment>
  );
};

export default Fund;
