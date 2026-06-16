import { useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import { usePeopleStore } from "../store/usePeopleStore";
import ErrorBoundary from "./ErrorBoundary";
import Row from "./Row";
import Header from "./Header";

export default function Main() {
  const people = usePeopleStore(( state ) => state.people);
  const fetchPeople = usePeopleStore(( state ) => state.fetchPeople);

  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  return (
    <ErrorBoundary>
      <Header />
      <main>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Height</TableCell>
                <TableCell>Eyes</TableCell>
                <TableCell>Birthdate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { people.map(( person, inx ) => <Row person={ person } key={ inx } />) }
            </TableBody>
          </Table>
        </Paper>
      </main>
    </ErrorBoundary>
  );
}
