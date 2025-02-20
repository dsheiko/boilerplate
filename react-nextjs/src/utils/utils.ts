import { AnyObject } from "@/utils/type";

export function removeNullProps( obj: AnyObject ): AnyObject {
  return Object.fromEntries( Object.entries( obj ).filter(( [_, v] ) => v !== null ) );
}