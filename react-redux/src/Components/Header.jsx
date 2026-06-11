import { AppBar, Toolbar, Typography } from "@mui/material";
import ErrorBoundary from "./ErrorBoundary";

export default function Header() {
  return (
    <ErrorBoundary>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Star Wars Characters
          </Typography>
        </Toolbar>
      </AppBar>
    </ErrorBoundary>
  );
}
