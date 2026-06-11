import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import { fetchPeople } from "../store/peopleSlice";
import ErrorBoundary from "./ErrorBoundary";
import Row from "./Row";
import Header from "./Header";

export default function Main() {
  const dispatch = useDispatch();
  const people = useSelector(( state ) => state.people.people);

  useEffect(() => {
    dispatch(fetchPeople());
  }, [dispatch]);

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
