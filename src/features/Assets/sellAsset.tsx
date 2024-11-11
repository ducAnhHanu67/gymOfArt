import React, { useState } from "react";

const SellAsset: React.FC = () => {
    const [files, setFiles] = useState<string[]>([
        "ABC.psd",
        "ABC.obj",
        "ABC.jpg",
        "tutorial.mp4",
    ]);
    const [mainImage, setMainImage] = useState<File | null>(null);

    const handleFileDelete = (fileName: string) => {
        setFiles(files.filter((file) => file !== fileName));
    };

    const handleFileAdd = () => {
        const newFileName = prompt("Enter the file name:");
        if (newFileName) setFiles([...files, newFileName]);
    };

    const handleMainImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setMainImage(file);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white p-4">
            <div className="max-w-5xl w-full bg-gray-800 rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6">Sell Your Assets</h1>
                <div className="grid grid-cols-2 gap-6">
                    {/* Asset Name and Price */}
                    <div className="mb-4">
                        <label className="block text-sm mb-2">Asset's Name</label>
                        <input
                            type="text"
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                            placeholder="Enter asset name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm mb-2">Price</label>
                        <input
                            type="number"
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                            placeholder="Enter price"
                        />
                    </div>

                    {/* Main Image */}
                    <div className="mb-4">
                        <label className="block text-sm mb-2">Main Image</label>
                        <div
                            className="w-full h-40 flex items-center justify-center bg-gray-700 border border-gray-600 rounded cursor-pointer"
                            onClick={() => document.getElementById("mainImageInput")?.click()}
                        >
                            {mainImage ? (
                                <img
                                    src={URL.createObjectURL(mainImage)}
                                    alt="Main"
                                    className="h-full object-cover"
                                />
                            ) : (
                                <span className="text-3xl font-bold text-gray-500">+</span>
                            )}
                        </div>
                        <input
                            id="mainImageInput"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleMainImageUpload}
                        />
                    </div>

                    {/* Sub Images */}
                    <div className="mb-4">
                        <label className="block text-sm mb-2">Sub Images</label>
                        <div className="w-full h-40 flex items-center justify-center bg-gray-700 border border-gray-600 rounded">
                            <span className="text-3xl font-bold text-gray-500">+</span>
                        </div>
                    </div>

                    {/* Type of Payment and Your Assets */}
                    <div className="mb-4">
                        <label className="block text-sm mb-2">Type of Payment</label>
                        <div className="flex gap-4">
                            <button className="bg-gray-700 px-4 py-2 rounded">QR Code</button>
                            <button className="bg-gray-700 px-4 py-2 rounded">Upload</button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm mb-2">Your Assets</label>
                        <div className="bg-gray-700 p-4 rounded">
                            {files.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between mb-2 last:mb-0"
                                >
                                    <span>{file}</span>
                                    <button
                                        onClick={() => handleFileDelete(file)}
                                        className="bg-red-600 px-2 py-1 rounded text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={handleFileAdd}
                                className="w-full bg-gray-600 px-4 py-2 rounded mt-2"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-sm mb-2">Description</label>
                    <textarea
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                        rows={4}
                        placeholder="Enter description"
                    ></textarea>
                </div>

                {/* Sell Button */}
                <div className="text-right">
                    <button className="bg-pink-600 px-6 py-2 rounded text-white">Sell</button>
                </div>
            </div>
        </div>
    );
};

export default SellAsset;
