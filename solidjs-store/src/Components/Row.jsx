import TableCell from "@suid/material/TableCell";
import TableRow from "@suid/material/TableRow";

export default function Row( props ) {
  return (
    <TableRow>
      <TableCell>{ props.person.name }</TableCell>
      <TableCell>{ props.person.gender }</TableCell>
      <TableCell>{ props.person.height }</TableCell>
      <TableCell>{ props.person.eyeColor }</TableCell>
      <TableCell>{ props.person.birthYear }</TableCell>
    </TableRow>
  );
}
