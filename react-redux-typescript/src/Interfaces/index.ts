export interface IPerson {
  name: string;
  gender: string;
  height: string;
  eyeColor: string;
  birthYear: string;
}

export interface IAppState {
  people: IPerson[];
}

export interface IRootState {
  state: IAppState;
}

export type TStore = IRootState & IAppActions;


export interface IAppActions {
  fetchPeople: () => Promise<IPerson[]>;
}
