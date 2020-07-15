import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"
import ShowImage from "./ShowImage"
import moment, { updateLocale } from 'moment'
import { addItem, updateItems } from "./CartHelper"

const Card = ({ product, showViewProductButton = true, showAddToCartButton = true, cartUpdate = false }) => {

    const [redirct, setRedirct] = useState(false)
    const [count, setCount] = useState(product.count)

    const showButton = (showViewProductButton) => {
        return (
            showViewProductButton && (

                <Link className="mr-2" to={`/product/${product._id}`}>
                    <button className="btn btn-outline-primary mt-2 mb-t">
                        view Product
                </button>
                </Link>
            )
        )
    }

    const addToCart = () => {
        addItem(product, () => {
            setRedirct(true)
        })
    }

    const shouldRedirct = redirct => {
        if (redirct) {
            return <Redirect to="cart" />
        } else {

        }
    }

    const showAddToCart = (showAddToCartButton) => {
        return (
            showAddToCartButton && (
                <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
                    Add to Cart
        </button>
            ))
    }

    const showStock = (quantity) => {
        return (quantity > 0 ? <span className="badge badge-primary badge-pill">In Stock</span> : <span badge badge-primary badge-pill>Out of Stock</span>

        )
    }

    const showCartUpdate = cartUpdate => {
        return cartUpdate && <div>
            <div className="input-group mb3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Adjust Qanity</span>
                </div>
                <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
            </div>
        </div>
    }

    const handleChange = productId => event => {
        setCount(event.target.value < 1 ? 1 : event.target.value)
        if (event.target.value >= 1) {
            updateItems(productId, event.target.value)
        }
    }

    return (

        <div className="card">
            {console.log(product)}
            <div className="card-header name">{product.name}</div>
            <div className="card-body">
                {shouldRedirct(redirct)}
                <ShowImage item={product} url="product" />
                <p className="lead mt-2">{product.description.substring(0, 75)}</p>
                <p className="black-10">$ {product.price}</p>
                <p className="black-9">Categry: {product.category && product.category.name}</p>
                <p className="black-8"> Added on {moment(product.createdAt).fromNow()}</p>
                {showStock(product.quantity)}
                <br />
                {showButton(showViewProductButton)}
                {showAddToCart(showAddToCartButton)}
                {showCartUpdate(cartUpdate)}
            </div>
        </div>

    )

}

export default Card;