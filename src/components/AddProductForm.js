import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {createProductAction} from "../actions/productActions";
import {hideAlert, showAlert} from "../actions/alertActions";

const AddProductForm = () => {

    // Component state
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    // Dispatch to execute actions
    const dispatch = useDispatch();

    // State from store
    const {alert} = useSelector(state => state.alert);

    // Call productAction using dispatch.
    const createProduct = product => dispatch(createProductAction(product));

    const handleSubmit = e => {
        e.preventDefault();

        // Verify form
        if (name.trim() === "" || price <= 0) {
            const alert = {
                msg: "All fields are required",
                class: "alert alert-danger text-center text-uppercase p-3"
            };
            dispatch(showAlert(alert));

            return;
        }

        dispatch(hideAlert());

        // Create new product
        createProduct({
            name,
            price
        });

        // Restart form
        setName("");
        setPrice("");
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Add New Product
                        </h2>

                        {alert ? <p className={alert.class}>{alert.msg}</p> : null}

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
                                    onChange={e => setName(e.target.value)}
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
                                    min={1}
                                    onChange={e => setPrice(Number(e.target.value))}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Add
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProductForm;