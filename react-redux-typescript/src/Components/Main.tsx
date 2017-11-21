import * as React from "react";
import { TStore } from "../Interfaces";
import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table";
import Paper from "material-ui/Paper";
import Row from "./Row";
import Header from "./Header";

interface IState {
  hasError: boolean;
}

// Class component
export default class Main extends React.Component<TStore, IState> {

    constructor( props: TStore ) {
        super( props );
        // Set error boundary
        this.state = { hasError: false };
    }
    // Using life-cycle methods
    componentDidMount() {
        const { fetchPeople } = this.props;
        fetchPeople();
    }

    // Catching JavaScript errors occurred within the component
    componentDidCatch() {
        this.setState({ hasError: true });
    }

    render() {
        const { people } = this.props.state;

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

