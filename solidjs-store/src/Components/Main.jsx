import { onMount, For } from "solid-js";
import Paper from "@suid/material/Paper";
import Table from "@suid/material/Table";
import TableBody from "@suid/material/TableBody";
import TableCell from "@suid/material/TableCell";
import TableHead from "@suid/material/TableHead";
import TableRow from "@suid/material/TableRow";
import Header from "src/Components/Header";
import Row from "src/Components/Row";
import { state, fetchPeople } from "src/store";

export default function Main() {
  onMount( () => {
    fetchPeople();
  } );

  return (
    <>
      <Header />
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Height</TableCell>
              <TableCell>Eye Color</TableCell>
              <TableCell>Birth Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <For each={ state.people }>
              { ( person ) => <Row person={ person } /> }
            </For>
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}
