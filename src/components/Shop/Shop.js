// import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
// import { addToDb, getStoredCart } from '../../utilities/fakedb';
import { addToDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products] = useProducts();
    // const [products, setProducts] = useState([]);
    // const [cart, setCart] = useState([]);
    const [cart, setCart] = useCart(products);
    // useEffect(() => {
    //     // console.log("Fetch Products first line");
    //     fetch('products.json')
    //     .then(res => res.json())
    //     .then(data => {
    //         setProducts(data)
    //         // console.log("Products loaded");
    //     })
    // },[]);
    // useEffect(() => {
    //     // console.log("Local Storage First line");
    //     const storedCart = getStoredCart();
    //     // console.log(storedCart);
    //     const savedCart = [];
    //     for (const id in storedCart) {
    //         // console.log(id);
    //         const addedProduct = products.find(product => product.id === id);
    //         if(addedProduct){
    //             const quantity = storedCart[id];
    //             addedProduct.quantity = quantity;
    //             // console.log(addedProduct);
    //             savedCart.push(addedProduct);
    //         }
    //     }
    //     setCart(savedCart);
    //     // console.log("Local Storage Finished");
    // },[products]); //Dependency Injection: dependency needs to be added here as it's asynchronous, both useEffect will work at the same time and it will take more time to fetch data so products array will be empty at first. But if we add dependency on products then this useEffect will run again when the fetch will be completed and whenever products array value changes
    const handleAddToCart = (selectedProduct) => {
        // console.log(selectedProduct);
        // cart.push(selectedProduct); //can't use this one in react as react is immutable, it creates new dom every time and compares with previous one. So here we will copy the array first so that when the array changes after adding new product it can compare with the previous one
        //triple dot before an array takes only the elements from an array and if we put it inside [], it will make a new array
        let newCart = [];
        const exists = cart.find(product => product.id === selectedProduct.id);
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else {
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        setCart(newCart);
        addToDb(selectedProduct.id);
    }
    return (
        <div className='shop-container'>
            {/* .products-container+.cart-container */}
            <div className="products-container">
                {/* <h3>Products : {products.length}</h3> */}
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/orders">
                        <button>Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;