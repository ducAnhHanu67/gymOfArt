import React, { useState } from "react";
import axios from "axios";

const SellAsset: React.FC = () => {
    const [files, setFiles] = useState<string[]>([
        "ABC.psd",
        "ABC.obj",
        "ABC.jpg",
        "tutorial.mp4",
    ]);
    const [mainImage, setMainImage] = useState<File | null>(null);
    const [productName, setProductName] = useState<string>("");
    const [price, setPrice] = useState<number | null>(null);
    const [description, setDescription] = useState<string>("");

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

    const handleSubmit = async () => {
        if (!productName || !price || !mainImage) {
            alert("Please fill in all required fields.");
            return;
        }

        const formData = new FormData();
        formData.append("ProductName", productName);
        formData.append("ProductType", "Artwork");
        formData.append("Price", price.toString());
        formData.append("ProductImage", mainImage);

        try {
            const response = await axios.post(
                "https://gymofart.azurewebsites.net/api/Product",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            alert("Asset successfully submitted!");
            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error submitting asset:", error);
            alert("Failed to submit the asset.");
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
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                            placeholder="Enter asset name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm mb-2">Price</label>
                        <input
                            type="number"
                            value={price || ""}
                            onChange={(e) => setPrice(Number(e.target.value))}
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

                    {/* Description */}
                    <div className="mb-4 col-span-2">
                        <label className="block text-sm mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                            rows={4}
                            placeholder="Enter description"
                        ></textarea>
                    </div>
                </div>

                {/* Sell Button */}
                <div className="text-right">
                    <button
                        onClick={handleSubmit}
                        className="bg-pink-600 px-6 py-2 rounded text-white"
                    >
                        Sell
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SellAsset;
