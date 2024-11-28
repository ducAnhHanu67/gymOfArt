import React, { useEffect, useState } from 'react';
import FeaturedItems from './components/FeaturedItems';
import ShopItemsGrid from './components/ShopItemsGrid';

interface ProductData {
  product: {
    productId: string;
    productName: string;
    productType: string;
    referenceId: string;
    price: number;
    createdAt: string;
    updatedAt: string | null;
  };
  imageUrl: string;
}
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

const ShopPage: React.FC = () => {
  const [shopItems, setShopItems] = useState<ProductData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://gymofart.azurewebsites.net/api/Product/admin-role', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: ProductData[] = await response.json();
        setShopItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1b26] text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        FEATURED & RECOMMENDED
      </h1>

      <FeaturedItems items={featuredItems} />{/* Bạn có thể cập nhật dữ liệu FeaturedItems nếu cần */}
      <ShopItemsGrid items={shopItems.map(item => ({
        id: item.product.productId,
        name: item.product.productName,
        price: item.product.price, // Hiển thị giá với đơn vị nghìn
        description: item.product.productType,
        date: new Date(item.product.createdAt).toLocaleDateString(),
        image: item.imageUrl,
      }))} />
    </div>
  );
};

export default ShopPage;
