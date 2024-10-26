import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const dummyData = [
    {
        id: "1",
        name: "Christmas Tree 3D",
        category: "Asset for designer",
        author: "HenrySmith09",
        date: "18th October, 2023",
        image: "/path/to/image.png" // Placeholder image path
    },
    {
        id: "2",
        name: "Christmas Tree 3D",
        category: "Asset for designer",
        author: "HenrySmith09",
        date: "18th October, 2023",
        image: "/path/to/image.png"
    },
    // Add more products if needed
];

const Library = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    // Click handler for navigating to My Store
    const handleSwitchToStore = () => {
        navigate('/store'); // Navigate to /store
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
                        <li className="bg-[#333348] p-3 rounded-md cursor-pointer">ALL (4)</li>
                        <li className="bg-[#333348] p-3 rounded-md cursor-pointer">3D (1)</li>
                    </ul>
                    <button className="w-full bg-transparent border border-gray-600 text-white rounded-md p-3 mt-6">
                        Create a new folder
                    </button>
                </div>

                {/* Main Content */}
                <div className="w-3/4">
                    {/* Toolbar */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl">ALL (4)</h2>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleSwitchToStore} // Attach click handler
                                className="bg-pink-600 px-4 py-2 rounded-md text-white"
                            >
                                Switch to My Store
                            </button>
                            <input
                                type="text"
                                placeholder="Search in Library..."
                                className="bg-[#2A2A3C] text-white p-2 rounded-md placeholder-gray-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {dummyData.map((product) => (
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
