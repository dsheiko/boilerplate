import * as React from "react";
import { TableCell, TableRow } from "material-ui/Table";
import { IPerson } from "../Interfaces";

interface IProps {
  person: IPerson;
}

export default class Row extends React.Component<IProps, {}> {

    render() {
        const { person } = this.props;
        return (
            <TableRow>
          <TableCell>{person.name}</TableCell>
          <TableCell>{person.gender}</TableCell>
          <TableCell  numeric>{person.height}</TableCell>
          <TableCell>{person.eyeColor}</TableCell>
          <TableCell>{person.birthYear}</TableCell>
        </TableRow>
          );
    }
}
