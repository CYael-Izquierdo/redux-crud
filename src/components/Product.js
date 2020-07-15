import React from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import * as Swal from "sweetalert2";

import {deleteProductAction} from "../actions/productActions";

const Product = ({product}) => {
    const {name, price, id} = product;

    const dispatch = useDispatch();

    const confirmDeleteProduct = id => {
        // Show confirm alert
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                // Execute action
                dispatch(deleteProductAction(id));
            }
        });
    };

    return (
        <tr>
            <td>{name}</td>
            <td><span className="font-weight-bold">$ {price}</span></td>
            <td className="actions">
                <Link to={`/products/edit/${id}`} className="btn btn-primary mr-2">
                    Edit
                </Link>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmDeleteProduct(id)}
                >Delete
                </button>
            </td>
        </tr>
    );
}

export default Product;
