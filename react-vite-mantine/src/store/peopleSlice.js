import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPeople = createAsyncThunk("people/fetch", async () => {
  const json = await fetch("/people.json").then(rsp => rsp.json());
  return json.results;
});

const peopleSlice = createSlice({
  name: "people",
  initialState: { people: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPeople.fulfilled, (state, action) => {
      state.people = action.payload;
    });
  }
});

export default peopleSlice.reducer;
