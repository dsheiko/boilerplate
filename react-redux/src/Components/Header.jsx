import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";

// Functional component
export default function Header() {
  return (
    <ErrorBoundary>
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit">
           Star Wars Characters
          </Typography>
        </Toolbar>
      </AppBar>
    </ErrorBoundary> );
}
