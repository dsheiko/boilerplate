import React from "react";
import ErrorBoundary  from "~/Components/ErrorBoundary";
import { Link } from "react-router-dom";
import { Table, Divider, Alert, Popconfirm } from "antd";

export default class AbstractTable extends React.Component {

  constructor( props ) {
    super( props );
    this.state = {
      pagination: {
        current: 1,
        pageSize: 50,
        total: 0
      },
      filterParams: {},
      sortParams: {},
      filterParams: {}
    }
    this.url = this.props.baseUrl;
    this.table = this.constructor.displayName;
    this.addButtonText = `New record`;
  }

  renderActions = ( text, record ) => (
    <span>
      <Link to={ `${ this.url }/${ record.id }` }>Edit</Link>
      <Divider type="vertical" />
      <Popconfirm placement="topRight" title="Are you sure to delete this record?"
        onConfirm={ () => this.removeRecord( record.id ) } okText="Yes" cancelText="No">
        <a href="#">Delete</a>
      </Popconfirm>
    </span>
  )

 removeRecord( id ) {
    this.api.remove( id );
    this.props.actions.loadTable( this.table, this.api );
  }

  /**
   * Get query params from filters given as key/value object literal like
   * { filter[firstName]: "val1", filter[lastName]: "val2" }
   */
  static getFilterParams( filters ) {
    return Object.entries( filters ).reduce(( carry, pair ) => {
        carry[ `filter[${ pair[ 0 ] }]` ] = pair[ 1 ];
        return carry;
      }, {});
  }

  // Overridable
  hookOnTableChange() {

  }

  /**
   * Send XHR to update table content
   */
  onTableChange = ( pagination, filters, sorter ) => {
  
    const pager = { ...this.state.pagination };
      // Intercept incoming pagination, filters, sorter, can map field for sort=true
      this.hookOnTableChange( pagination, filters, sorter );
      pager.current = pagination.current;
      // Normalize filters from  {firstName: [ "value1" ], lastName: [ "value2" ]} to key-value object
      const filterMap = Object.entries( filters ).reduce( ( carry, pair ) => {
              if ( pair[ 1 ] === null ) {
                return carry;
              } 
              carry[ pair[ 0 ] ] = pair[ 1 ].join( "," );
              return carry;
            }, {}),
            filterParams = { ...this.state.filterParams, ...filterMap };

      const sortParams = {
        sortField: sorter.field,
        sortOrder: sorter.order === "ascend" ? "ASC" : "DESC",
      }

      this.setState({
        pagination: pager,
        sortParams,
        filterParams
      });


      this.fetch({
        pageSize: pagination.pageSize,
        current: pagination.current,
        ...sortParams,
        ...AbstractTable.getFilterParams( filterParams )
    });
  }


  fetch = ( params = {} ) => {
    this.props.actions.loadTable( this.table, this.api, params );
  }

  async componentDidMount() {
    const { preloaded } = this.props.store.app.tables[ this.table ];
    if ( preloaded ) {
      return;
    }
    this.fetch();
  }

  addRecord = ( e ) => {
    e.preventDefault();
  }

  render() {
    const { rows, total, loading, errorMessage } = this.props.store.app.tables[ this.table ];

    return (<ErrorBoundary>

    { errorMessage ? <Alert
        message="Error"
        description={ errorMessage }
        type="error"
      /> : null }


    <Table columns={ this.state.columns }
      loading={ loading }
      dataSource={ rows }
      onChange={ this.onTableChange }
      pagination = { {
        ...this.state.pagination,
        total
      }}
     
     />

    </ErrorBoundary>);
  }
};