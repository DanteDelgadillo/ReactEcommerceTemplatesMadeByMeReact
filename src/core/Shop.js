import React, { useState, useEffect } from "react"
import Layout from "./Layout"
import Card from "./Card"
import { getCategories, getFilteredProducts } from "./apiCore"
import CheckBox from './CheckBox'
import RadioBox from './RadioBox'
import { prices } from "./FixedPrices"

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: {
            category: [],
            price: []

        }
    })
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [limit, setLimit] = useState(6)
    const [skip, setSkip] = useState(0)
    const [filteredResults, setFilteredResults] = useState(0)

    const init = () => {
        getCategories()
            .then(data => {
                if (data.error) {

                    setError(data.error)

                } else {
                    setCategories(data)
                }
            })
    }

    useEffect(() => {
        init()
    }, [])

    const handleFilters = (filters, filterBy) => {
        // console.log("shop", filters, filterBy)
        const newFilter = { ...myFilters }
        newFilter.filters[filterBy] = filters

        if (filterBy == "price") {
            let priceValues = handlePrice(filters);
            newFilter.filters[filterBy] = priceValues
        }

        loadFilterResults(myFilters.filters)

        setMyFilters(newFilter)
    }

    const handlePrice = value => {
        const data = prices
        let array = []

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array
            }
        }
        return array;
    }

    const loadFilterResults = (newFilter) => {
        // console.log(newFilter)
        getFilteredProducts(skip, limit, newFilter)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setFilteredResults(data)
                }
            })
    }

    return (
        <Layout
            title="Home Page" description="Node react Ecomerce app" className="container-fluid"
        >
            <div className="row">
                <div className="col-4">
                    <h4>Filter By Categories </h4>
                    <ul>
                        <CheckBox categories={categories} handleFilters={filters =>
                            handleFilters(filters, 'category')} />
                    </ul>

                    <h4>Filter By Price Range </h4>
                    <ul>
                        <RadioBox
                            prices={prices}
                            handleFilters={filters =>
                                handleFilters(filters, "price")
                            }

                        />
                    </ul>
                </div>
                <div className="col-8">
                    {JSON.stringify(filteredResults)}
                </div>
            </div>

        </Layout>
    )
}

export default Shop;