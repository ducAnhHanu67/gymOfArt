// src/components/Library.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store'; // Đảm bảo đường dẫn chính xác đến store.ts
import { Product } from '../../redux/cartLibrarySlice'; // Import kiểu Product

const Library: React.FC = () => {
    const navigate = useNavigate();
    const libraryItems = useSelector((state: RootState) => state.cartLibrary.library); // Lấy library từ Redux store

    const handleSwitchToStore = () => {
        navigate('/store');
    };

    return (
        <div className="bg-[#1F1F30] text-white min-h-screen p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold">MY LIBRARY</h1>
                <p className="text-gray-400">Purchased Products</p>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <div className="w-1/4 pr-6">
                    <ul className="space-y-4">
                        <li className="bg-[#333348] p-3 rounded-md cursor-pointer">ALL ({libraryItems.length})</li>
                    </ul>
                    <button className="w-full bg-transparent border border-gray-600 text-white rounded-md p-3 mt-6">
                        Create a new folder
                    </button>
                </div>

                {/* Main Content */}
                <div className="w-3/4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl">ALL ({libraryItems.length})</h2>
                        <button onClick={handleSwitchToStore} className="bg-pink-600 px-4 py-2 rounded-md text-white">
                            Switch to My Store
                        </button>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {libraryItems.map((product: Product) => (
                            <div key={product.id} className="bg-[#333348] p-4 rounded-lg">
                                <div className="h-40 bg-[#ff3366] flex items-center justify-center mb-4">
                                    <span className="text-white">Image</span>
                                </div>
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
        </div>
    );
};

export default Library;
