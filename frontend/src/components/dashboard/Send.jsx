import React, { useContext, useState } from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { Input } from "../auth/input";
import { getName } from "../../utils/helper";
import { ClipLoader } from "react-spinners";
import { UserContext } from "../../contexts/user.context";
import { internalTransfer, transferToChimoney } from "../../utils/firebase/firebase.utils";

function preventDefault(event) {
  event.preventDefault();
}

const defaultValue = {
  transfer_amount: "",
  user_details: "",
};

const Send = () => {
  const [formField, setFormField] = useState(defaultValue);
  const [state, setstate] = useState("unloaded");
  const { currentUser, setUserDetails } = useContext(UserContext);

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
            placeholder={
              key == "transfer_amount"
                ? "Input amount in USD"
                : "Input users name or email address"
            }
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
          <div className="flex flex-col gap-5 justify-between">
            <Link
              color="#00D871"
              href="#"
              onClick={(e) => {
                preventDefault(e);
                internalTransfer(
                  currentUser,
                  setUserDetails,
                  formField.user_details,
                  formField.transfer_amount,
                  setstate,
                  defaultValue,
                  setFormField
                );
              }}
              style={{
                marginRight: "auto",
              }}
            >
              Transfer to user
            </Link>
            <Link
              color="#00D871"
              href="#"
              onClick={(e) => {
                preventDefault(e);
                transferToChimoney(
                  currentUser,
                  setUserDetails,
                  formField.user_details,
                  formField.transfer_amount,
                  setstate,
                  defaultValue,
                  setFormField
                );
              }}
            >
              Transfer to chimoney
            </Link>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Send;
