import React from 'react';
import Header from "./components/Header";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Products from "./components/Products";
import AddProductForm from "./components/AddProductForm";
import EditProductForm from "./components/EditProductForm";

// Redux
import {Provider} from "react-redux";
import store from "./store"

function App() {
    return (
        <Router>
            <Provider store={store}>
                <Header/>

                <div className="container mt-5">
                    <Switch>
                        <Route exact path="/" component={Products}/>
                        <Route exact path="/products/new" component={AddProductForm}/>
                        <Route exact path="/products/edit/:id" component={EditProductForm}/>
                    </Switch>
                </div>
            </Provider>
        </Router>
    );
}

export default App;
