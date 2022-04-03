import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import { removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css'

const Orders = () => {
    const [products] = useProducts();
    const [cart, setCart] = useCart(products);
    const navigate = useNavigate();
    const handleRemoveProduct = (selectedItem) => {
        const rest = cart.filter(product => product.id !== selectedItem.id);
        setCart(rest);
        removeFromDb(selectedItem.id);
    }
    return (
        <div className='shop-container'>
            <div className="review-items-container">
                {
                    cart?.map(product => <ReviewItem
                        key={product.id}
                        product={product}
                        handleRemoveProduct={handleRemoveProduct}
                    ></ReviewItem>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                        <button onClick={() => navigate('/inventory')}>Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;