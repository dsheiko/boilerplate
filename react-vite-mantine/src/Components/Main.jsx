import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Paper } from "@mantine/core";
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
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Gender</Table.Th>
                <Table.Th>Height</Table.Th>
                <Table.Th>Eyes</Table.Th>
                <Table.Th>Birthdate</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              { people.map(( person, inx ) => <Row person={ person } key={ inx } />) }
            </Table.Tbody>
          </Table>
        </Paper>
      </main>
    </ErrorBoundary>
  );
}
