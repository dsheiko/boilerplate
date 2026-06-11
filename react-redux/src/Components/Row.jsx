import { TableCell, TableRow } from "@mui/material";

export default function Row({ person }) {
  return (
    <TableRow>
      <TableCell>{ person.name }</TableCell>
      <TableCell>{ person.gender }</TableCell>
      <TableCell>{ person.height }</TableCell>
      <TableCell>{ person.eyeColor }</TableCell>
      <TableCell>{ person.birthYear }</TableCell>
    </TableRow>
  );
}
