import React from "react";
import UiAdvancedTable  from "~/Components/UiAdvancedTable";
import { api } from "~/Api/Project";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function SettingsProjectTable( props ) {
  let prefetchedData = useLoaderData();
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      getColumnSearchProps: "name",
    },
    {
      title: "Environment",
      dataIndex: "env",
      sorter: true,
      filters: [
        {
          text: "test",
          value: "test",
        },
        {
          text: "live",
          value: "live",
        }
      ]
    },
    {
      title: "Actions",
      key: "action",
      width: "120px",
      actions: "EditDelete"
    }
  ];

  return ( <>
     <Helmet>
        <title>Demo // Projects </title>
        <meta name="description" content="Managing the list of projects" />
    </Helmet>
    <UiAdvancedTable columns={ columns } api={ api }  baseUrl="/settings/project" 
       enableSelection={ true }  prefetchedData={ prefetchedData } { ...props } />
    </> );

};
