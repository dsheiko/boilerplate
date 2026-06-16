export function byTypes( ...types ) {
  return ( items ) => items.filter( ( { type } ) => types.includes( type ) );
}
