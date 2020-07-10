import React from "react"
import { Link } from "react-router-dom"
import ShowImage from "./ShowImage"

const Card = ({ product, showViewProductButton = true }) => {

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
    return (

        <div className="card">
            <div className="card-header">{product.name}</div>
            <div className="card-body">
                <ShowImage item={product} url="product" />
                <p>{product.description.substring(0, 75)}</p>
                <p>$ {product.price}</p>

                {showButton(showViewProductButton)}
                <button className="btn btn-outline-warning mt-2 mb-2">
                    Add to Cart
                </button>
            </div>
        </div>

    )

}

export default Card;