// Each reducer has their own state
import {
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,
    ADD_PRODUCT_PENDING,
    START_DOWNLOAD_PRODUCTS,
    DOWNLOAD_PRODUCTS_SUCCESS,
    DOWNLOAD_PRODUCTS_ERROR,
    DELETE_PRODUCT_PENDING,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_ERROR,
    GET_PRODUCT_PENDING,
    GET_PRODUCT_ERROR,
    GET_PRODUCT_SUCCESS, EDIT_PRODUCT_SUCCESS,
} from "../types";

const initialState = {
    products: [],
    error: false,
    loading: false,
    productToDelete: null,
    product: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT_PENDING:
        case START_DOWNLOAD_PRODUCTS:
        case ADD_PRODUCT_PENDING:
            return {
                ...state,
                loading: true,
                error: false,
            }

        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: [action.payload, ...state.products],
                error: false
            }

        case GET_PRODUCT_ERROR:
        case DELETE_PRODUCT_ERROR:
        case DOWNLOAD_PRODUCTS_ERROR:
        case ADD_PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        case DOWNLOAD_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
                error: false
            }

        case DELETE_PRODUCT_PENDING:
            return {
                ...state,
                productToDelete: action.payload
            }

        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                productToDelete: null,
                error: false,
                products: [
                    ...state.products.filter(product => product.id !== state.productToDelete)
                ]
            }

        case GET_PRODUCT_SUCCESS:
            return {
                ...state,
                product: action.payload,
                loading: false,
                error: false
            }

        case EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                product: null,
                products: state.products.map(
                    product => product.id === action.payload.id ? product = action.payload : product
                )
            }

        default:
            return state;
    }
}
