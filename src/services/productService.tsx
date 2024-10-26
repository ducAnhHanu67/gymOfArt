import axios from 'axios';

const API_BASE_URL = 'https://yourapi.com'; // Thay bằng URL API của bạn

// Hàm để lấy chi tiết sản phẩm dựa trên productId
export const fetchProductById = async (productId: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/Product/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product data:", error);
        throw error; // Ném lỗi để component có thể xử lý
    }
};
