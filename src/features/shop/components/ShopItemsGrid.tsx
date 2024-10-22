import React from 'react';
import ShopItem from './ShopItem';

interface ShopItemsGridProps {
  items: {
    name: string;
    price: number;
    description: string;
    date: string;
    image: string;
  }[];
}

const ShopItemsGrid: React.FC<ShopItemsGridProps> = ({ items }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
    {items.map((item, index) => (
      <ShopItem key={index} item={item} />
    ))}
  </div>
);

export default ShopItemsGrid;
