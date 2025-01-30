import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/Context";

const merchEndpoint = "http://localhost:5016";

const MerchContainer = ({ merch, canEdit, canAddToCart, quantity, canAddAndRemove }) => {
    const { handleAddToCart, handleRemoveFromCart } = useContext(CartContext)
    return (
        <div className="flex flex-col items-center pt-10 column-12 column-sm-6 column-lg-4 column-xl-3 border rounded p-2 shadow-2xl py-10 bg-white drop-shadow-sm w-64">
            {merch.imageUrl && <img className="w-52 h-52 object-cover" src={`${merchEndpoint}/images/${merch.imageUrl}`} alt={`Image of ${merch.name}`}></img>}
            <p className="font-semibold text-xl">{merch.name}</p>
            <p>Price: ${merch.price}</p>
            <div className="flex">
            {canAddAndRemove && <button onClick={() => handleRemoveFromCart(merch)} className="flex justify-center border rounded w-5 h-5 items-center">-</button>}
            {canAddAndRemove && <button onClick={() => handleAddToCart(merch)} className="flex justify-center border rounded w-5 h-5 items-center">+</button>}
            </div>        
            {quantity ? <p>Quantity: {quantity}</p> : <p>In stock: {merch.stockQuantity}</p>}
            {canEdit && <Link to={`edit/${merch.id}`} className="font-bold bg-blue-500 hover:bg-blue-400 py-2 px-3 rounded mt-4 cursor-pointer">Edit</Link>}
            {canAddToCart && <button className="font-bold disabled:text-gray-400 disabled:bg-gray-200 bg-green-400 hover:bg-green-300 py-2 px-3 rounded mt-4" onClick={() => handleAddToCart(merch)} disabled={merch.stockQuantity <= 0}>Add to cart</button>}
        </div>
    )
}

export default MerchContainer;