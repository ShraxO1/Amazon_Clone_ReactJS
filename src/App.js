import React from "react";
import './App.css';
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import {useStateValue} from "./StateProvider";
import {useEffect} from "react";
import {auth} from "./firebase";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

function App() {
    const [{}, dispatch] = useStateValue();

    const promise = loadStripe(
        "pk_test_51ItB6LSDsxWfLBuP13m77bKtmazbr7HYBUcW5Zb4kWYLu1Vxq3tTvulIQnD3dVbVDgyBImSNzc8lFLaGgJtPGMBb00ZQnZHbpm"
        );

    useEffect(() => {
        // will only run once when the app component loads...

        auth.onAuthStateChanged((authUser) => {
            console.log("THE USER IS >>> ", authUser);

            if (authUser) {
                // the user just logged in / the user was logged in

                dispatch({
                    type: "SET_USER",
                    user: authUser,
                });
            } else {
                // the user is logged out
                dispatch({
                    type: "SET_USER",
                    user: null,
                });
            }
        });
    }, []);

    return (
      <Router>
        <div className="App">
            <Switch>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/payment">
                    <Header/>
                    <Elements stripe={promise}>
                        <Payment/>
                    </Elements>
                </Route>
                <Route path="/checkout">
                    <Header/>
                    <Checkout/>
                </Route>
                <Route path="/">
                    <Header/>
                    <Home/>
                </Route>
            </Switch>
        </div>
      </Router>
  );
}

export default App;
