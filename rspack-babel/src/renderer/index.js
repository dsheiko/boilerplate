function buildRow( raw, summary ) {
  const isFiltered = summary === null;
  const cls = isFiltered ? " class=\"filtered\"" : "";
  const targetId = raw.target?.id ?? "—";
  const output = isFiltered ? "<em>filtered out</em>" : summary;
  return `<tr${ cls }>
      <td>${ raw.id }</td>
      <td><code>${ raw.type }</code></td>
      <td><code>${ targetId }</code></td>
      <td>${ output }</td>
    </tr>`;
}

export function render( rawEvents, processedEvents ) {
  const byId = new Map( processedEvents.map( ( e ) => [ e.id, e.summary ] ) );
  const rows = rawEvents.map( ( e ) => buildRow( e, byId.get( e.id ) ?? null ) );
  document.querySelector( "#app" ).innerHTML = `
    <table>
      <thead>
        <tr><th>#</th><th>type</th><th>target</th><th>pipeline output</th></tr>
      </thead>
      <tbody>${ rows.join( "" ) }</tbody>
    </table>
    <p class="note">Pipeline: byTypes("click","input") → toSummary(). Grey rows were filtered out.</p>
  `;
}
