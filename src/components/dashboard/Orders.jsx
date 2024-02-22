import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

// Generate Order Data
function createData(id, date, name, amount) {
  return { id, date, name, amount };
}

const rows = [
  createData(0, "16 Mar, 2019", "Elvis Presley", 312.44),
  createData(1, "16 Mar, 2019", "Paul McCartney", 866.99),
  createData(2, "16 Mar, 2019", "Tom Scholz", 100.81),
  createData(3, "16 Mar, 2019", "Michael Jackson", 654.39),
  createData(4, "15 Mar, 2019", "Bruce Springsteen", 212.79),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
   
    </React.Fragment>
  );
}
