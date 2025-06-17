import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";



type FetchPizzasParams = {
  search: string;
  currentPage: number;
  categoryId: number;
  sort: {
    sortProperty: string;
  };
};

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasParams>(
  "pizza/fetchPizzasStatus",
  async ({ search, currentPage, categoryId, sort }) => {
    const queryString = `https://67fd003b3da09811b1744c6c.mockapi.io/pizzas?page=${currentPage}&limit=4${
      categoryId > 0 ? `&category=${categoryId}` : ""
    }&sortBy=${sort.sortProperty}&order=desc${
      search ? `&search=${search}` : ""
    }`;

    const res = await axios.get<Pizza[]>(queryString);
    return res.data;
  }
);

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

interface PizzaSliceState {
  items: Pizza[];
  status: "loading" | "success" | "error";
}

const initialState: PizzaSliceState = {
  items: [],
  status: "loading",
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});

export const selectPizzaData = (state: RootState) => state.pizzaSlice;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
