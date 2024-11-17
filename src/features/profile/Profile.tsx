import React from "react";

const Profile: React.FC = () => {
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            {/* Cover Image */}
            <div className="relative">
                <img
                    src="https://via.placeholder.com/1200x300"
                    alt="Cover"
                    className="w-full h-64 object-cover rounded-b-lg"
                />
                <div className="absolute top-48 left-1/2 transform -translate-x-1/2">
                    <img
                        src="https://via.placeholder.com/100"
                        alt="Avatar"
                        className="rounded-full border-4 border-gray-800"
                    />
                </div>
            </div>

            {/* Profile Section */}
            <div className="text-center mt-16">
                <h1 className="text-2xl font-bold">Eva</h1>
                <p className="text-gray-400 mt-2">
                    Hello friends, this is one of the screens from my project in college.
                    I know it's not good compared to some pro but I don't know.
                </p>
                <p className="text-gray-400 mt-1">
                    Can someone help me push this artwork up? Love everyone{" "}
                    <span className="text-pink-500">^_^</span>
                </p>

                {/* Tags */}
                <div className="flex justify-center space-x-4 mt-4">
                    <span className="bg-pink-600 px-4 py-2 rounded-full text-sm">
                        UX Design
                    </span>
                    <span className="bg-blue-600 px-4 py-2 rounded-full text-sm">
                        Product Design
                    </span>
                    <span className="bg-green-600 px-4 py-2 rounded-full text-sm">
                        Web-Developer
                    </span>
                </div>

                {/* Buttons */}
                <div className="flex justify-center space-x-4 mt-6">
                    <button className="bg-pink-600 px-6 py-2 rounded-lg text-white">
                        Edit Profile
                    </button>
                    <button className="bg-gray-700 px-6 py-2 rounded-lg text-white">
                        Settings
                    </button>
                </div>
            </div>

            {/* Gallery Section */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-12 px-4">
                {[...Array(12)].map((_, index) => (
                    <div
                        key={index}
                        className="bg-gray-800 rounded-lg overflow-hidden shadow-md"
                    >
                        <img
                            src={`https://via.placeholder.com/150?text=Image+${index + 1}`}
                            alt={`Gallery ${index + 1}`}
                            className="w-full"
                        />
                    </div>
                ))}
            </div>

            {/* Sidebar */}
            <div className="fixed top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 p-4 rounded-lg shadow-lg">
                <ul className="space-y-4">
                    <li className="text-gray-400 hover:text-white cursor-pointer">
                        Feedback
                    </li>
                    <li className="text-gray-400 hover:text-white cursor-pointer">
                        Upload
                    </li>
                    <li className="text-gray-400 hover:text-white cursor-pointer">
                        Learn
                    </li>
                </ul>
                <div className="mt-6 text-center">
                    <p>Buy Eva a Coffee</p>
                    <span className="text-pink-600 text-2xl">☕</span>
                </div>
            </div>
        </div>
    );
};

export default Profile;
