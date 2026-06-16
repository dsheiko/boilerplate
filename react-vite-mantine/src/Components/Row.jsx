import { Table } from "@mantine/core";

export default function Row({ person }) {
  return (
    <Table.Tr>
      <Table.Td>{ person.name }</Table.Td>
      <Table.Td>{ person.gender }</Table.Td>
      <Table.Td>{ person.height }</Table.Td>
      <Table.Td>{ person.eyeColor }</Table.Td>
      <Table.Td>{ person.birthYear }</Table.Td>
    </Table.Tr>
  );
}
