import React, { useEffect, useState } from "react";
import { BookOpen, ChevronDown, Star, Upload } from "lucide-react";

const Profile: React.FC = () => {
    const [profileData, setProfileData] = useState<any>(null);
    const accountId = localStorage.getItem('accountId');

    useEffect(() => {
        // Tải dữ liệu từ API
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://gymofart.azurewebsites.net/api/Account/${accountId}`
                );
                const data = await response.json();
                setProfileData(data);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };
        fetchData();
    }, []);

    // Kiểm tra nếu chưa có dữ liệu
    if (!profileData) {
        return <div className="text-center text-white">Loading...</div>;
    }

    const { avatar, backgroundImage, artworks } = profileData;

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            {/* Cover Image */}
            <div className="relative">
                <img
                    src={backgroundImage}
                    alt="Cover"
                    className="w-full h-64 object-cover rounded-b-lg"
                />
                <div className="absolute top-48 left-1/2 transform -translate-x-1/2">
                    <img
                        src={avatar}
                        alt="Avatar"
                        className="rounded-full border-4 border-gray-800"
                        style={{ width: '100px', height: '100px' }}
                    />
                </div>
            </div>

            {/* Profile Section */}
            <div className="text-center mt-16">
                <h1 className="text-2xl font-bold">{profileData.userName || "User"}</h1>
                <p className="text-gray-400 mt-2">{profileData.email}</p>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-1/4 lg:w-1/5 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-white">Items</h2>
                            <ChevronDown size={20} className="text-pink-500" />
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-center space-x-2 text-gray-400 hover:text-white cursor-pointer">
                                <Star size={20} className="text-blue-500" />
                                <span>Feedback</span>
                            </li>
                            <li className="flex items-center space-x-2 text-gray-400 hover:text-white cursor-pointer">
                                <Upload size={20} className="text-pink-500" />
                                <span>Upload</span>
                            </li>
                            <li className="flex items-center space-x-2 text-gray-400 hover:text-white cursor-pointer">
                                <BookOpen size={20} className="text-red-500" />
                                <span>Learn</span>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-12 text-center">
                        <p className="text-gray-400 mb-4">Buy Eva a Coffee</p>
                        <button className="bg-pink-600 text-white px-4 py-2 rounded-full flex items-center justify-center mx-auto">
                            ☕
                        </button>
                        <div className="flex justify-center items-center text-gray-400 space-x-2 mt-4">
                            <span>12</span>
                            <span>🛒</span>
                        </div>
                    </div>
                </div>

                {/* Gallery Section */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 px-4 flex-grow">
                    {artworks.map((artwork: any, index: number) => (
                        <div
                            key={index}
                            className="bg-gray-800 rounded-lg overflow-hidden shadow-md"
                        >
                            <img
                                src={artwork.image.imageUrl}
                                alt={artwork.title || `Artwork ${index + 1}`}
                                className="w-full"
                            />
                            <div className="p-2">
                                <h3 className="text-white font-bold text-sm">{artwork.title}</h3>
                                {artwork.description && (
                                    <p className="text-gray-400 text-xs">{artwork.description}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
