import { useContext, useEffect } from "react";
import { useState } from "react";
import MerchService from "../services/MerchService";
import MerchContainer from "../components/MerchContainer";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { CartContext } from "../contexts/Context";

const MerchPage = () => {
    const { cart, totalItems, totalPrice } = useContext(CartContext)
    const [merchList, setMerchList] = useState([]);
    const [lowSearchValue, setLowSearchValue] = useState("");
    const [highSearchValue, setHighSearchValue] = useState("");

    useEffect(() => {
        fetchMerch();
    }, []);

    const fetchMerch = async () => {
        try {
            const allMerch = await MerchService.getAllMerch();
            setMerchList(allMerch);
        } catch (error) {
            console.error("Failed to fetch merch data: ", error);
        }
    };

    useEffect(() => {
        console.log(cart);
    }, [cart])

    const searchForPrice = async (e) => {
        e.preventDefault();

        if (lowSearchValue == "" && highSearchValue == "") {
            await fetchMerch()
        } else {
            try {
                const merch = await MerchService.getMerchByPrice(lowSearchValue, highSearchValue);
                setMerchList(merch);
            } catch (error) {
                console.error("Failed to fetch merch data: ", error);
                setMerchList([]);
            }
        }
    }

    return (
        <div className="p-10">
            <p className="font-bold text-2xl pb-10">All merch items</p>
            <p>Total Items in cart: {totalItems}</p>
            <p>Total Price: {totalPrice}$</p>
            <form className="flex flex-col mb-7" onSubmit={searchForPrice}>
                <InputField value={lowSearchValue} type="text" onChange={(e) => setLowSearchValue(e.target.value)} title="Search for lowest price: " placeholder={"Search..."}></InputField>
                <InputField value={highSearchValue} type="text" onChange={(e) => setHighSearchValue(e.target.value)} title="Search for highest prise: " placeholder={"Search..."}></InputField>
                <Button className="mt-5" type="submit" text="Search"></Button>
            </form>
            
            {merchList?.length > 0 ? (
                <div className="grid-layout gap-10">
                {merchList.map((merch) => (
                    <MerchContainer key={merch.id} merch={merch} canEdit={false} canAddToCart={true} canAddAndRemove={false}></MerchContainer>
                ))}
            </div>
            ) : (
                <p className="text-red-500">No merch items found.</p>
            )}
        </div>
    )
}
export default MerchPage;