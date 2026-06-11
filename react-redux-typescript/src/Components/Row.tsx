import { TableCell, TableRow } from "@mui/material";
import type { IPerson } from "../store/peopleSlice";

interface IProps {
  person: IPerson;
}

export default function Row({ person }: IProps) {
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
