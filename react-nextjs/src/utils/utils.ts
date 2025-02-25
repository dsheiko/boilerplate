import { AnyObject } from "@/utils/type";

export function removeNullProps( obj: AnyObject ): AnyObject {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return Object.fromEntries( Object.entries( obj ).filter(( [_, v] ) => v !== null ) );
}