import React from "react";
import UiTable  from "~/Components/UiTable";
import { api } from "~/Api/Project";
import { useSelector } from "react-redux";

export default () => {
  const { rows, total } = useSelector( ( state ) => state.app.tables.SettingsProjectTable );
  
  const columns = [
    {
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
    }
  ];

  return ( <UiTable columns={ columns } api={ api } /> );

};