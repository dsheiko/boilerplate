import type { AppEvent } from "./types";

export const events: AppEvent[] = [
  { id: 1, type: "click",  target: { id: "btn-submit", label: "Submit"   }, meta: null },
  { id: 2, type: "input",  target: { id: "search",     label: "Search"   }, meta: { debounce: 300 } },
  { id: 3, type: "click",  target: { id: "btn-cancel"                    }, meta: null },
  { id: 4, type: "scroll", target: null,                                    meta: { threshold: 100 } },
  { id: 5, type: "focus",  target: { id: "email",      label: "Email"    }, meta: null },
  { id: 6, type: "input",  target: { id: "password",   label: "Password" }, meta: { debounce: 500 } }
];
