import React from 'react';
import FeaturedItems from './components/FeaturedItems';
import ShopItemsGrid from './components/ShopItemsGrid';

const featuredItems = [
  {
    title:
      "From your story to a character's glory: commission my skills and let your vision take wing!",
    image: '/placeholder.svg?height=400&width=800',
    tag: 'NOW AVAILABLE',
  },
  {
    title: 'Unleash your creativity with our exclusive art collection!',
    image: '/placeholder.svg?height=400&width=800',
    tag: 'NEW ARRIVAL',
  },
  {
    title: 'Discover the magic of art with our curated selections!',
    image: '/placeholder.svg?height=400&width=800',
    tag: 'HOT PICK',
  },
  // Add more featured items here
];

const shopItems = [
  {
    name: 'Christmas Tree 3D',
    price: 0.99,
    description: 'Asset for designer',
    date: '18th October, 2023',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    name: 'Winter Wonderland',
    price: 1.99,
    description: 'Beautiful winter scene',
    date: '19th October, 2023',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    name: 'Summer Breeze',
    price: 2.99,
    description: 'Relaxing summer landscape',
    date: '20th October, 2023',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    name: 'Autumn Leaves',
    price: 1.49,
    description: 'Colorful autumn foliage',
    date: '21st October, 2023',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    name: 'Spring Blossom',
    price: 2.49,
    description: 'Vibrant spring flowers',
    date: '22nd October, 2023',
    image: '/placeholder.svg?height=200&width=200',
  },
  // Add more shop items here
];

const ShopPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#1a1b26] text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        FEATURED & RECOMMENDED
      </h1>

      <FeaturedItems items={featuredItems} />
      <ShopItemsGrid items={shopItems} />
    </div>
  );
};

export default ShopPage;
