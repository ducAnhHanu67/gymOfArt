import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../services/productService'; // Đường dẫn tùy thuộc vào cấu trúc thư mục của bạn

const ProductDetail = () => {
    const { productId } = useParams(); // Nhận productId từ URL
    const [item, setItem] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchProductById(productId)
                setItem(data);
            } catch (error) {
                // setError();
            }
        };

        fetchData();
    }, [productId]);

    if (error) return <div className="error-message">{error}</div>;
    if (!item) return <div>Đang tải...</div>;

    return (
        <div className="product-detail bg-[#1F1F30] text-white">
            <h2 className="font-bold text-2xl mb-4">{item.name}</h2>
            <div className="flex justify-between items-center">
                <p>{item.price}</p>
                <p>{item.date}</p>
            </div>
            <p className="mt-4">{item.description}</p>
            {/* Thêm các chi tiết sản phẩm khác tại đây */}
        </div>
    );
};

export default ProductDetail;
