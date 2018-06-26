import React, { Component } from "react";
import PropTypes from "prop-types";
import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table";
import Paper from "material-ui/Paper";
import Row from "./Row";
import Header from "./Header";

// Class component
export default class Main extends Component {

  static propTypes = {
    states: PropTypes.shape({
      people: PropTypes.array.isRequired
    }),
    actions: PropTypes.shape({
      fetchPeople: PropTypes.func.isRequired
    })
  }

  constructor( props ) {
    super( props );
    // Set error boundary
    this.state = { hasError: false };
  }
  // Using life-cycle methods
  componentDidMount() {
    const { actions } = this.props;
    actions.fetchPeople();
  }

  // Catching JavaScript errors occurred within the component
  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { people } = this.props.states;

    return (
      <div>
        <Header />
        <main>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Gernder</TableCell>
                  <TableCell numeric>Height</TableCell>
                  <TableCell>Eyes</TableCell>
                  <TableCell>Birthdate</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { people.map( ( person, inx ) => ( <Row person={person} key={inx} /> ) ) }
              </TableBody>
            </Table>
          </Paper>
        </main>
      </div>
    );
  }
}

