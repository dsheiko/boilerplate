import * as React from "react";
import { connect } from "react-redux";
import Main from "../Components/Main";
import * as Actions from "../Actions";
import { TStore, IAppState } from "../Interfaces";

// Mapping state to the props
const mapStateToProps = ( state: IAppState )  => ({ state });
// Mapping actions to the props
const mapDispatchToProps = {
  ...Actions
};

class App extends React.Component<TStore, {}> {
  render() {
    return (
        <Main {...this.props} />
    );
  }
}

// Connect store to App
export default connect<{}, {}, TStore>(
  mapStateToProps,
  mapDispatchToProps
)( App );
