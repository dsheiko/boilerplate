import React, { Component } from "react";
import PropTypes from "prop-types";
import { TableCell, TableRow } from "material-ui/Table";

export default class Row extends Component {

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

// Runtime type checking for React props
Row.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    eyeColor: PropTypes.string.isRequired,
    birthYear: PropTypes.string.isRequired
  }).isRequired
};
