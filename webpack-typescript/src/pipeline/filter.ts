import type { AppEvent } from "../types";

export function byTypes( ...types: string[] ): ( items: AppEvent[] ) => AppEvent[] {
  return ( items ) => items.filter( ( { type } ) => types.includes( type ) );
}
