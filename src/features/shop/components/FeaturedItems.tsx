import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FeaturedItemsProps {
  items: {
    title: string;
    image: string;
    tag: string;
  }[];
}

const FeaturedItems: React.FC<FeaturedItemsProps> = ({ items }) => {
  const [currentFeatured, setCurrentFeatured] = useState(0);

  return (
    <div className="relative mb-8">
      <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
        <img
          src={items[currentFeatured]?.image}
          alt={items[currentFeatured]?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center p-4">
          <div>
            <div className="inline-block bg-[#ff3366] text-white text-sm font-bold py-1 px-2 rounded mb-4">
              {items[currentFeatured]?.tag}
            </div>
            <h2 className="text-3xl font-bold mb-4">
              {items[currentFeatured]?.title}
            </h2>
            <button className="bg-white text-black py-2 px-4 rounded shadow-md hover:bg-gray-200 transition">
              Learn More
            </button>
          </div>
        </div>
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition"
        onClick={() =>
          setCurrentFeatured((prev) =>
            prev === 0 ? items.length - 1 : prev - 1
          )
        }
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition"
        onClick={() =>
          setCurrentFeatured((prev) =>
            prev === items.length - 1 ? 0 : prev + 1
          )
        }
      >
        <ChevronRight size={24} />
      </button>

      {/* Navigation Dots */}
      <div className="flex justify-center space-x-2 mb-8">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentFeatured ? 'bg-blue-500' : 'bg-gray-400'} hover:bg-blue-300 transition`}
            onClick={() => setCurrentFeatured(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedItems;
