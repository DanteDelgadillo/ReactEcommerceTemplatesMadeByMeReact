import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Layout from "./Layout"
import { getBraintreeClientToken, processPayment } from "./apiCore"
import { emptyCart } from "./CartHelper"
import Card from "./Card";
import { isAuthenticated } from "../auth"
import DropIn from "braintree-web-drop-in-react"

const CheckOut = ({ products, setRun = f => f, run = undefined }) => {

    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token


    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            // console.log(data, userId, token)
            if (data.error) {
                setData({ ...data, error: data.error })
            } else {
                setData({ clientToken: data.clientToken })
            }
        })
    }

    useEffect(() => {
        getToken(userId, token)
    }, [])


    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0)

    }

    const ShowCheckOut = () => {


        return isAuthenticated() ? (
            <div >{showDropIn()}</div>
        ) : (
                <Link to="/signin">
                    <button className="btn btn-primary">Sign in to CheckOut</button></Link>
            )

    }

    const buy = () => {
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
            .then(data => {
                console.log(data)
                nonce = data.nonce
                // console.log("set nonce total to proccess", nonce, getTotal(products))

                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                }

                processPayment(userId, token, paymentData)
                    .then(response => {
                        // console.log(response)
                        setData({ ...data, success: response.success })
                        //empty cart
                        emptyCart(() => {
                            setRun(!run); // update parent state
                            console.log("payment success and emty cart")
                        })
                        //create Order
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => {

                setData({ ...data, error: error.message })
            })
    }

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: "" })}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <DropIn options={{
                        authorization: data.clientToken,
                        paypal: {
                            flow: "vault"
                        }

                    }} onInstance={instance => (data.instance = instance)} />
                    <button onClick={buy} className="btn btn-success btn-block">Pay</button>
                </div>
            ) : null}
        </div>
    )

    const showError = error => (
        <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
            {error}
        </div>
    )

    const showSuccess = success => (
        <div className="alert alert-info" style={{ display: success ? "" : "none" }}>
            Thanks! Your Order was Successfull
        </div>
    )

    return (
        <div>
            <h2>Toatal: ${getTotal()}</h2>
            {showSuccess(data.success)}
            {showError(data.error)}
            {ShowCheckOut()}
        </div>
    )
}

export default CheckOut