import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Layout from "./Layout"
import { getProduct } from "./apiCore"
import Card from "./Card"
import { getCart } from './CartHelper'

const Cart = () => {

    const [items, setItems] = useState([])


    useEffect(() => {
        setItems(getCart())
    }, [])

    const showItems = items => {
        return (
            <div>
                <h2>Your Cart has {`${items.length}`}</h2>
                <hr />
                {items.map((p, i) => (
                    <Card key={i} product={p}></Card>
                ))}
            </div>
        )
    }

    const noItemsMessage = () => (
        <h2>
            Your Cart is emty.<Link to="/shop">Continue Shopping</Link>
        </h2>
    )


    return (
        <Layout title="Shopping Cart" description="Manage your Cart" className="container-fluid">
            <div className="row">
                <div className="col-6">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>
                <div className="col-6">
                    <p>Show check out opptions addresss /total/update</p>
                </div>

            </div>
        </Layout>
    )
}

export default Cart