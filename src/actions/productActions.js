import Swal from "sweetalert2";

import {
    ADD_PRODUCT_ERROR,
    ADD_PRODUCT_PENDING,
    ADD_PRODUCT_SUCCESS,
    DELETE_PRODUCT_ERROR,
    DELETE_PRODUCT_PENDING,
    DELETE_PRODUCT_SUCCESS,
    DOWNLOAD_PRODUCTS_ERROR,
    DOWNLOAD_PRODUCTS_SUCCESS,
    EDIT_PRODUCT_PENDING,
    EDIT_PRODUCT_SUCCESS,
    GET_PRODUCT_ERROR,
    GET_PRODUCT_PENDING,
    GET_PRODUCT_SUCCESS,
    START_DOWNLOAD_PRODUCTS
} from "../types";
import axiosClient from "../config/axios";

// Create new product
export const createProductAction = product => {
    return async dispatch => {
        dispatch(addProductPending());
        Swal.showLoading();

        try {
            // Call api to create product
            await axiosClient.post("/products", product);

            // Successful call
            dispatch(addProductSuccess(product));
            Swal.fire(
                "Successful",
                "The product was added successfully",
                "success"
            ).then();
        } catch (e) {
            // Error
            console.log(e)
            dispatch(addProductError(true));
            Swal.fire(
                "Error",
                "There was an error",
                "error"
            ).then();
        }
    }
};

// change loading to true
const addProductPending = () => ({
    type: ADD_PRODUCT_PENDING
});

// add product, change loading and error to false
const addProductSuccess = product => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: product
});

// Change loading to false and error to true
const addProductError = status => ({
    type: ADD_PRODUCT_ERROR,
    payload: status
});

// Get products from api
export const getProductsAction = () => {
    return async dispatch => {
        dispatch(downloadProducts());

        try {
            const response = await axiosClient("/products");

            dispatch(downloadProductsSuccess(response.data));
        } catch (e) {
            console.log(e);

            dispatch(downloadProductsError(true));
        }
    };
};

const downloadProducts = () => ({
    type: START_DOWNLOAD_PRODUCTS
});

const downloadProductsSuccess = products => ({
    type: DOWNLOAD_PRODUCTS_SUCCESS,
    payload: products
});

const downloadProductsError = status => ({
    type: DOWNLOAD_PRODUCTS_ERROR,
    payload: status
});

// Delete product
export const deleteProductAction = id => {
    return async dispatch => {
        dispatch(deleteProductPending(id));

        try {
            await axiosClient.delete(`/products/${id}`);
            dispatch(deleteProductSuccess());

            // Show alert
            Swal.fire(
                'Deleted!',
                'Your product has been deleted.',
                'success'
            ).then();
        } catch (e) {
            console.log(e);
            dispatch(deleteProductError());
            Swal.fire(
                "Error",
                "There was an error",
                "error"
            ).then();
        }
    }
};

const deleteProductPending = id => ({
    type: DELETE_PRODUCT_PENDING,
    payload: id
});

const deleteProductSuccess = () => ({
   type: DELETE_PRODUCT_SUCCESS
});

const deleteProductError = () => ({
    type: DELETE_PRODUCT_ERROR,
    payload: true
});

export const getProductPending = () => ({
   type: GET_PRODUCT_PENDING
});

export const getProductSuccess = product => ({
   type: GET_PRODUCT_SUCCESS,
    payload: product
});

export const getProductError = product => ({
   type: GET_PRODUCT_ERROR,
    payload: true
});

// Edit product from api
export const editProductAction = product => {
    return async dispatch => {
      dispatch(editProductPending(product));

      try {
          const result = await axiosClient.put(`/products/${product.id}`, product);

      } catch (e) {
          console.log(e);
      }
    };
}

const editProductPending = () => ({
    type: EDIT_PRODUCT_PENDING
});

const editProductSuccess = product => ({
    type: EDIT_PRODUCT_SUCCESS,
    payload: product
});