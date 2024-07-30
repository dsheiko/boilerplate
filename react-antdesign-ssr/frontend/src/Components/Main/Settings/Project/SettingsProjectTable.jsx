import React from "react";
import UiTable  from "~/Components/UiTable";
import { api } from "~/Api/Project";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function SettingsProjectTable( props ) {
  let prefetchedData = useLoaderData();
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

  return ( <>
     <Helmet>
        <title>Demo // Projects </title>
        <meta name="description" content="Managing the list of projects" />
    </Helmet>
    <UiTable columns={ columns } api={ api } table="SettingsProjectTable" baseUrl="/settings/project" 
    prefetchedData={ prefetchedData } { ...props } />
    </> );

};
