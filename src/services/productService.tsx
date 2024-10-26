import axios from 'axios';

const API_BASE_URL = 'https://gym-of-art.azurewebsites.net/api';

export const fetchProductById = async (productId: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/Product/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product data:", error);
        throw error; // Ném lỗi để component có thể xử lý
    }
};
