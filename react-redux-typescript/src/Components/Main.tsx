import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import { RootState, AppDispatch } from "../store";
import { fetchPeople } from "../store/peopleSlice";
import Row from "./Row";
import Header from "./Header";

export default function Main() {
  const dispatch = useDispatch<AppDispatch>();
  const people = useSelector(( state: RootState ) => state.people.people);

  useEffect(() => {
    dispatch(fetchPeople());
  }, [dispatch]);

  return (
    <div>
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
    </div>
  );
}
