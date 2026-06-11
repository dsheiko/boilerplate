export interface EventMeta {
  debounce?: number;
  threshold?: number;
}

export interface EventTarget {
  id: string;
  label?: string;
}

export interface AppEvent {
  id: number;
  type: string;
  target: EventTarget | null;
  meta: EventMeta | null;
}

export interface ProcessedEvent extends AppEvent {
  summary: string;
}
