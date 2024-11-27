import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store'; // Đảm bảo đường dẫn chính xác đến store.ts
import { Product } from '../../redux/cartLibrarySlice'; // Import kiểu Product

const StoreComponent: React.FC = () => {
    const navigate = useNavigate();
    const cartItems = useSelector((state: RootState) => state.cartLibrary.cart);

    // Trạng thái để mở popup tải về
    const [showDownloadPopup, setShowDownloadPopup] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleSwitchToLibrary = () => {
        navigate('/library');
    };

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setShowDownloadPopup(true);
    };

    const handleClosePopup = () => {
        setShowDownloadPopup(false);
        setSelectedProduct(null);
    };

    // Mở ảnh trong cửa sổ mới
    // const handleOpenImageInNewWindow = () => {
    //     if (selectedProduct?.image) {
    //         // Mở cửa sổ mới với URL của ảnh
    //         window.open(selectedProduct.image, '_blank');
    //     }
    // };
    const handleOpenImageInNewWindow = async () => {
        if (selectedProduct?.image) {
            try {
                // Gửi yêu cầu GET đến API để lấy ảnh dưới dạng Blob
                const response = await fetch(
                    `https://gymofart.azurewebsites.net/api/Image/download?imageUrl=${selectedProduct.image}`,
                    {
                        method: 'GET',
                        headers: {
                            'Accept': '*/*', // Yêu cầu nhận bất kỳ kiểu dữ liệu nào
                        },
                    }
                );

                // Kiểm tra nếu yêu cầu thành công
                if (response.ok) {
                    // Lấy ảnh dưới dạng Blob
                    const imageBlob = await response.blob();

                    // Kiểm tra kiểu MIME của ảnh trả về (ví dụ: image/jpeg, image/png)
                    const contentType = response.headers.get('Content-Type');
                    let extension = '';

                    // Xác định phần mở rộng tệp dựa trên MIME type
                    if (contentType?.includes('jpeg')) {
                        extension = 'jpg';
                    } else if (contentType?.includes('png')) {
                        extension = 'png';
                    } else if (contentType?.includes('gif')) {
                        extension = 'gif';
                    } else {
                        extension = 'jpg'; // Mặc định là jpg nếu không xác định được
                    }

                    // Tạo URL đối tượng từ Blob
                    const imageUrl = URL.createObjectURL(imageBlob);

                    // Tạo một thẻ <a> để tải ảnh xuống
                    const link = document.createElement('a');
                    link.href = imageUrl;
                    link.download = `${selectedProduct.name || 'download'}.${extension}`; // Đặt tên tệp tải về

                    // Kích hoạt download
                    link.click();

                    // Giải phóng URL đối tượng sau khi tải xong
                    URL.revokeObjectURL(imageUrl);
                } else {
                    console.error('Error downloading image:', response.statusText);
                }
            } catch (error) {
                console.error('Failed to fetch image:', error);
            }
        }
    };




    return (
        <div className="bg-[#1F1F30] text-white min-h-screen p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold">MY STORE</h1>
                <p className="text-gray-400">Purchased Products</p>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <div className="w-1/4 pr-6">
                    <ul className="space-y-4">
                        <li className="bg-[#333348] p-3 rounded-md cursor-pointer">ALL ({cartItems.length})</li>
                    </ul>
                    <button className="w-full bg-transparent border border-gray-600 text-white rounded-md p-3 mt-6">
                        Create a new folder
                    </button>
                    <button className="w-full bg-pink-500 text-white rounded-md p-3 mt-4"
                        onClick={() => navigate('/sell-asset')}
                    >
                        Sell Your Assets
                    </button>
                </div>

                {/* Main Content */}
                <div className="w-3/4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl">ALL ({cartItems.length})</h2>
                        <button onClick={handleSwitchToLibrary} className="bg-pink-600 px-4 py-2 rounded-md text-white">
                            Switch to My Purchase
                        </button>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cartItems.map((product: Product) => (
                            <div
                                key={product.id}
                                className="bg-[#333348] p-4 rounded-lg cursor-pointer"
                                onClick={() => handleProductClick(product)} // Mở popup khi nhấp vào sản phẩm
                            >
                                {/* Image */}
                                <div className="h-40 bg-[#ff3366] flex items-center justify-center mb-4">
                                    {product.image ? (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-full w-full object-cover rounded-md"
                                        />
                                    ) : (
                                        <span className="text-white">No Image</span>
                                    )}
                                </div>

                                {/* Product Information */}
                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                <p className="text-gray-400 text-sm">{product.category}</p>
                                <div className="flex justify-between items-center mt-2 text-gray-500 text-xs">
                                    <p>By {product.author}</p>
                                    <p>{product.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Popup Download */}
            {showDownloadPopup && selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[#1F1F30] p-6 rounded-lg max-w-md w-full">
                        <h3 className="text-2xl font-semibold text-white mb-4">Download {selectedProduct.name}</h3>

                        {/* Show Image in Popup */}
                        <div className="mb-4">
                            <div className="h-40 bg-[#ff3366] flex items-center justify-center mb-4">
                                {selectedProduct.image ? (
                                    <img
                                        src={selectedProduct.image}
                                        alt={selectedProduct.name}
                                        className="h-full w-full object-cover rounded-md"
                                    />
                                ) : (
                                    <span className="text-white">No Image</span>
                                )}
                            </div>
                        </div>

                        <div className="mb-4">
                            <p className="text-gray-400">Product: {selectedProduct.name}</p>
                            <p className="text-gray-400">Category: {selectedProduct.category}</p>
                            <p className="text-gray-400">By: {selectedProduct.author}</p>
                            <p className="text-gray-400">Date: {selectedProduct.date}</p>
                        </div>

                        {/* Download Button */}
                        <div className="flex justify-between items-center">
                            {selectedProduct.image && (
                                <button
                                    className="bg-pink-500 text-white px-4 py-2 rounded-md"
                                    onClick={handleOpenImageInNewWindow} // Mở cửa sổ mới hiển thị ảnh
                                >
                                    Download Image
                                </button>
                            )}
                            <button
                                className="bg-gray-600 text-white px-4 py-2 rounded-md"
                                onClick={handleClosePopup}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoreComponent;
