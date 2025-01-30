import { createContext, useState, useEffect } from "react";
import MerchService from "../services/MerchService";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState({});
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const [feedback, setFeedback] = useState({
        message: "",
        type: ""
    });

    useEffect(() => {
        const localStorageCart = localStorage.getItem("cart")
        if (localStorageCart == null) {
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            setCart(JSON.parse(localStorageCart))
        }
    }, []);

    const handleAddToCart = async (merch) => {
        const copyCart = { ...cart }
        if (copyCart[merch.id] != null) {
            copyCart[merch.id].quantity = copyCart[merch.id].quantity + 1
        } else {
            copyCart[merch.id] = {
                quantity: 1,
                merch: merch
            }
        }
        localStorage.setItem("cart", JSON.stringify(copyCart))
        console.log(copyCart);
        setCart(copyCart)
    }

    useEffect(() => {
        const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
        setTotalItems(totalItems);
        const totalPrice = Object.values(cart).reduce((sum, item) => sum + item.quantity * item.merch.price, 0);
        setTotalPrice(Math.round(totalPrice))
    }, [cart]);

    const handleRemoveFromCart = async (merch) => {
        const copyCart = { ...cart }
        if (copyCart[merch.id].quantity <= 1) {
            delete copyCart[merch.id]
            setCart(copyCart)
        } else {
            copyCart[merch.id].quantity = copyCart[merch.id].quantity - 1
            setCart(copyCart)
        }
        localStorage.setItem("cart", JSON.stringify(copyCart))
    }

    const handlePurchase = async () => {
        if (Object.keys(cart).length <= 0) return;
        
        const copyCart = { ...cart }

        let canPurchase = true;

        Object.values(copyCart).forEach(cartItem => {
            if (cartItem.merch.stockQuantity - cartItem.quantity < 0 && cartItem.merch != null) {
                console.log("The item is either low or out of stock. Either remove your item form the cart or lower the amount.")
                setFeedback({
                    message: "The item is either low or out of stock. Either remove your item form the cart or lower the amount.",
                    type: "error"
                });
                canPurchase = false
                return
            }
        })

        if (!canPurchase) {
            return
        }

        const cartValues = Object.values(copyCart)
        for (const cartItem of cartValues) {
            cartItem.merch.stockQuantity = cartItem.merch.stockQuantity - cartItem.quantity
            try {
                await MerchService.updateMerch(cartItem.merch.id, cartItem.merch);
            } catch (error) {
                console.error("Error occured while updating merch item:", error);
                canPurchase = false
            }
        }
        if (!canPurchase) {
            return
        }
        setCart({});
        localStorage.setItem("cart", JSON.stringify({}))
        setFeedback({
            message: "You successfully purchased!",
            type: "success"
        });
    }

    return (
        <CartContext.Provider value={{ cart, handleAddToCart, totalItems, totalPrice, handleRemoveFromCart, handlePurchase, feedback }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;