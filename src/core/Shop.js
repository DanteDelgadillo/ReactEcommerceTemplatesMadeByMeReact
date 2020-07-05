import React, { useState, useEffect } from "react"
import Layout from "./Layout"
import Card from "./Card"

const Shop = () => {

    return (
        <Layout
            title="Home Page" description="Node react Ecomerce app" className="container-fluid"
        >
            <div className="row">
                <div className="col-4">
                    leftsidebar
    </div>
                <div className="col-8">
                    rightsidebar
    </div>
            </div>

        </Layout>
    )
}

export default Shop;