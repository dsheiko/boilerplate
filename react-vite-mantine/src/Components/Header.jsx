import { Box, Group, Title } from "@mantine/core";
import ErrorBoundary from "./ErrorBoundary";

export default function Header() {
  return (
    <ErrorBoundary>
      <Box bg="blue.6" py="sm" px="md">
        <Group>
          <Title order={4} c="white">Star Wars Characters</Title>
        </Group>
      </Box>
    </ErrorBoundary>
  );
}
