import React from "react";
import PropTypes from "prop-types";
import AbstractForm from "Components/AbstractForm";

/*eslint no-useless-escape: 0*/

export default class AbstractEditModal extends AbstractForm {

  constructor( props ) {
    super( props );
    this.url = this.props.baseUrl;
    this.table = this.props.table;
    this.state = {
      loading: false,
      errorMessage: "",
      files: {},
      entity: {
      },
      ready: false
    }
  }

  getWindowTitle() {
    return this.props.pk ? `Edit record` : `New record`;
  }

  async componentDidMount() {
    const { pk } = this.props;
    if ( !pk ) {
      this.setState({ ready: true });
      return;
    }
    try {
      this.setState({
        loading: true
      });
      const rsp = await this.transformFetch( await this.api.get( pk ) );
      if ( rsp.status !== 200 ) {
        throw new Error( `Server status code ${ rsp.status }` );
      }
      this.setState({ entity: rsp.data, ready: true });
    } catch ( err ) {
      this.setState({
        errorMessage: `Internal error: ${ err.message }`
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  }

  close() {
    this.props.history.push( this.url );
  }

  onClickCancel = ( e ) => {
    e.preventDefault();
    this.close();
  }

  normalizeData( data ) {
    return data;
  }

  async submit( pk, values ) {
    const data = values;
    if ( pk ) {
      return await this.api.update( pk, data );
    } else {
      return await this.api.add( data );
    }
  }

  async transformFetch( entity ) {
    return entity;
  }

  onClickOk = ( e ) => {
    const { validateFields } = this.props.form,
          pk = this.props.pk;
    e.preventDefault();
    this.setState({ errorMessage: ``, loading: true });

    validateFields( async ( err, data ) => {
      const values = this.normalizeData( data );
      if ( err ) {
        this.setState({ loading: false });
        return;
      }
      try {
        await this.submit( pk, values );
        this.props.actions.loadTable( this.table, this.api );
        this.close();
      } catch ( err ) {
        this.setState({ errorMessage: `Internal server error: ${ err.message }`, loading: false });
      }
    });
  }

};

