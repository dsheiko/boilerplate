import type { AppEvent, ProcessedEvent } from "../types";

function buildRow( raw: AppEvent, summary: string | null ): string {
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

export function render( rawEvents: AppEvent[], processedEvents: ProcessedEvent[] ): void {
  const byId = new Map<number, string>( processedEvents.map( ( e ) => [ e.id, e.summary ] ) );
  const rows = rawEvents.map( ( e ) => buildRow( e, byId.get( e.id ) ?? null ) );
  const app = document.querySelector( "#app" );
  if ( !app ) { return; }
  app.innerHTML = `
    <table>
      <thead>
        <tr><th>#</th><th>type</th><th>target</th><th>pipeline output</th></tr>
      </thead>
      <tbody>${ rows.join( "" ) }</tbody>
    </table>
    <p class="note">Pipeline: byTypes("click","input") → toSummary(). Grey rows were filtered out.</p>
  `;
}
