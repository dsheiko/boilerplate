export function toSummary( items ) {
  return items.map( ( item ) => {
    const label = item.target?.label ?? item.target?.id ?? "unknown";
    const debounce = item.meta?.debounce ?? 0;
    const threshold = item.meta?.threshold ?? 0;
    const extra = debounce ? ` (debounce: ${ debounce }ms)`
      : threshold ? ` (threshold: ${ threshold }px)`
      : "";
    return {
      ...item,
      summary: `[${ item.type.toUpperCase() }] ${ label }${ extra }`
    };
  } );
}
