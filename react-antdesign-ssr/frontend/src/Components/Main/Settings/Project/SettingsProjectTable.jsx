import React from "react";
import PropTypes from "prop-types";
import AbstractTable  from "Components/AbstractTable";
import { api } from "Api/Project";

export default class SettingsProjectTable extends AbstractTable {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    baseUrl: PropTypes.string.isRequired
  };

  constructor( props ) {
    super( props );
    this.api = api;
    this.state = {
      columns: [{
        title: "Name",
        dataIndex: "name",
        sorter: true
      },
      {
        title: "Environment",
        dataIndex: "env",
        sorter: true,
        filters: [
          {
            text: 'test',
            value: 'test',
          },
          {
            text: 'live',
            value: 'live',
          }
        ]
      },
      {
        title: "Actions",
        key: "action",
        width: "120px",
        render: this.renderActions
      }]
    }
  }

};
// Need it available even before class props parsed because it's used as table ID
SettingsProjectTable.displayName = "SettingsProjectTable";