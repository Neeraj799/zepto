import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:4800/api/admin/products/addProduct",
      formData,
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get(
      "http://localhost:4800/api/admin/products/getProduct",

      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const updateProduct = createAsyncThunk(
  "/products/updateProduct",
  async ({ id, formData }) => {
    const result = await axios.patch(
      `http://localhost:4800/api/admin/products/updateProduct/${id}`,
      formData,
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:4800/api/admin/products/deleteProduct/${id}`,

      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

const AdminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })

      .addCase(addNewProduct.pending, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })

      .addCase(updateProduct.pending, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })

      .addCase(deleteProduct.pending, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductSlice.reducer;
