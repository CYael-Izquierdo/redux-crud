import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {editProductAction} from "../actions/productActions";
import {ClipLoader} from "react-spinners";
import axiosClient from "../config/axios";

const EditProductForm = props => {

    const history = useHistory();
    const dispatch = useDispatch();

    // State with new product values
    const [product, setProduct] = useState({
        name: "",
        price: "",
        id: null
    });
    const {name, price} = product;

    const {loading} = useSelector(state => state.products);

    useEffect(() => {
        axiosClient.get(`/products/${props.match.params.id}`)
            .then(response => setProduct(response.data));
    }, [props.match.params.id]);

    const handleFieldChange = e => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        // Verify form
        if (name.trim() === "" || price <= 0) {
            return;
        }

        // Edit product
        dispatch(editProductAction(product));

        history.push("/");
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Edit Product
                        </h2>
                        {loading ?
                            <div className="text-center">
                                <ClipLoader
                                    color="#78c2ad"
                                    size={50}
                                />
                            </div>
                            :
                            <form
                                onSubmit={handleSubmit}
                            >
                                <div className="form-group">
                                    <label>Product name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Product name"
                                        name="name"
                                        value={name}
                                        onChange={handleFieldChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Product Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Product price"
                                        name="price"
                                        value={price}
                                        onChange={handleFieldChange}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                                >Save Changes
                                </button>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProductForm;