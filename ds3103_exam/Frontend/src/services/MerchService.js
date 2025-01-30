import axios from "axios";

const MerchService = (() => {
    const merchEndpoint = "http://localhost:5016/merch";

    const createMerch = async (newMerch) => {
        try {
            const response = await axios.post(merchEndpoint, newMerch);
            return response.data;
        } catch (error) {
            console.error("Error occured while creating a new merch item:", error)
        }
    }

    const getAllMerch = async () => {
        try {
            const response = await axios.get(merchEndpoint);
            return response.data;
        } catch (error) {
            console.error("Error occured while fetching all merch items:", error);
        }
    }

    const getMerchById = async (id) => {
        try {
            const response = await axios.get(merchEndpoint + `/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error occurred while fetching merch with ID ${id}:`, error);
        }
    }

    const getMerchByPrice = async (lowestPrice, highestPrice) => {
        try {
            const response = await axios.post(merchEndpoint + `/price`, {
                    "lowestPrice": lowestPrice,
                    "highestPrice": highestPrice,
            });
            return response.data
        } catch (error) {
            console.error(`Error occurred while fetching merch with price: ${lowestPrice} ${highestPrice}:`, error);
        }
    }

    const updateMerch = async (id, updatedMerch) => {
        try {
            const response = await axios.put(merchEndpoint + `/${id}`, updatedMerch);
            return response.data;
        } catch (error) {
            console.error(`Error occurred while updating merch with ID ${id}:`, error);
        }
    }

    const deleteMerch = async (id) => {
        try {
            const response = await axios.delete(merchEndpoint + `/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error occured while deleting merch with ID ${id}:`, error);
        }
    }

    return {
        createMerch,
        getAllMerch,
        getMerchById,
        getMerchByPrice,
        updateMerch,
        deleteMerch
    }
})();

export default MerchService;