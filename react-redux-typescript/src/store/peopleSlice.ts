import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface IPerson {
  name: string;
  gender: string;
  height: string;
  eyeColor: string;
  birthYear: string;
}

interface PeopleState {
  people: IPerson[];
}

const initialState: PeopleState = { people: [] };

export const fetchPeople = createAsyncThunk("people/fetch", async () => {
  const json = await fetch("/people.json").then(rsp => rsp.json());
  return json.results as IPerson[];
});

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPeople.fulfilled, (state, action) => {
      state.people = action.payload;
    });
  }
});

export default peopleSlice.reducer;
