import { createConstants } from "Util";

export const constants = createConstants([
  "SET_APP",
  "SET_TABLE"
]);

export const setApp = payload => ({
    type: constants.SET_APP,
    payload
});

export const setTable = ( id, payload ) => ({
    type: constants.SET_TABLE,
    id,
    payload
});

export const loadTable = ( tableId, api, params = {} ) => async ( dispatch ) => {

  try {
    await dispatch( setTable( tableId, { loading: true }) );
    const data = await api.getList( params ),
          rawRows = data.rows,
          total = data.total,
          rows = rawRows.map( item => ({
            ...item,
            key: item.id
          }));
          
    await dispatch( setTable( tableId, { rows, total, preloaded: false }) );
  } catch ( err ) {
    await dispatch( setTable( tableId, { errorMessage: `Internal error: ${ err.message }` }) );
  } finally {
    await dispatch( setTable( tableId, { loading: false }) );
  }
};