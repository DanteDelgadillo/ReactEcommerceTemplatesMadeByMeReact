import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Signup from "./Signup";
import Signin from "./Signin";
import Home from "../core/Home";
import Menu from "../core/Menu";

const Routes = () => {
    return (
        <BrowserRouter>
            <Menu></Menu>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;