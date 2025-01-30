import { useContext } from "react";
import { CartContext } from "../contexts/Context";
import MerchContainer from "../components/MerchContainer";
import Button from "../components/Button";

const ShoppingCartPage = () => {
    const { cart, totalItems, totalPrice, feedback, handlePurchase } = useContext(CartContext);
    const cartItems = Object.values(cart)

    function handleClickPurchase(e) {
        e.preventDefault();
        handlePurchase();
    }

    return (
        <div className="p-10">
            <h1 className="font-bold text-2xl pb-10">Shopping Cart</h1>
            <form className="pb-10">
            <p>Total Items: {totalItems}</p>
            <p className="pb-5">Total Price: ${totalPrice}</p>
            <Button type="submit" onClick={handleClickPurchase} text="Purchase all"></Button>
            </form>
            {cartItems.length > 0 ? (
                <div className="grid-layout gap-10 pb-7">
                {cartItems.map(({ merch, quantity }) => (
                    <MerchContainer key={merch.id} quantity={quantity} merch={merch} canEdit={false} canAddToCart={false} canAddAndRemove={true}></MerchContainer>
                ))}
                </div>
            ) : (
                <p className="text-red-500">No merch items found.</p>
            )}
                <p className={(feedback.type === "error" ? "text-red-500" : "text-green-500")}>{feedback.message}</p>
        </div>
    )
}
export default ShoppingCartPage;

