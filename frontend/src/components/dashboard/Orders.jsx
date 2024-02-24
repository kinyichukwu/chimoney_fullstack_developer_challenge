import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { UserContext } from "../../contexts/user.context";

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const { userDetails } = React.useContext(UserContext);

  console.log(userDetails?.transactions, "trans");
  return (
    <React.Fragment>
      <Title>Transaction History</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userDetails?.transactions &&
            [...userDetails?.transactions]?.reverse()?.map((row, i) => (
              <TableRow key={i}>
                <TableCell>
                  {row.date?.seconds
                    ? new Date(row.date?.seconds * 1000).toDateString()
                    : new Date(row.date).toDateString()}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell style={{ color: row.amount < 0 && "red" }}>{`${
                  row.amount > 0
                    ? "$" + row.amount
                    : "-$" + Math.abs(row.amount)
                }`}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
