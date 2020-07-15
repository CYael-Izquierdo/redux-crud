import React, {Fragment, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import ClipLoader from "react-spinners/ClipLoader"

import {getProductsAction} from "../actions/productActions";
import Product from "./Product";

const Products = () => {

    const dispatch = useDispatch();
    const {products, error, loading} = useSelector(state => state.products);

    useEffect(() => {
        // Call api
        const loadProducts = () => dispatch(getProductsAction());

        loadProducts();
    }, []);

    return (
        <Fragment>
            <h2 className="text-center my-5">Product List</h2>

            {error ? <p className="font-weight-bold alert alert-danger text-center mt-4">There was an error</p> : null}

            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                <tr>
                    <th scope="col" className="w-50">Name</th>
                    <th scope="col" className="w-25">Price</th>
                    <th scope="col" className="w-25">Actions</th>
                </tr>
                </thead>
                <tbody>

                {loading ?
                    <tr>
                        <td colSpan={3} className="text-center">
                            <ClipLoader
                                color="#78c2ad"
                                size={50}
                            />
                        </td>
                    </tr>
                    :
                    products.length === 0 ?
                        <tr>
                            <td colSpan={3} className="text-center">
                                There is no products
                            </td>
                        </tr>
                        :
                        products.map(product => (
                            <Product
                                key={product.id}
                                product={product}
                            />
                        ))}
                </tbody>
            </table>
        </Fragment>
    );
}

export default Products;