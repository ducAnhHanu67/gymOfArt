import { useNavigate } from "react-router-dom";

interface ShopItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    description: string;
    date: string;
    image: string;
  };
}

const ShopItem: React.FC<ShopItemProps> = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${item.id}`);
  };

  return (
    <div onClick={handleClick} className="flex flex-col justify-center items-center bg-[#1F1F30] rounded-lg cursor-pointer">
      <div className="size-[90%] bg-[#1a1b26] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
        <div className="h-48 bg-[#ff3366] flex items-center justify-center">
          <span className="text-white text-lg">Image</span>
        </div>
      </div>
      <div className="p-4 text-white w-[90%] mt-1">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg mb-1">{item.name}</h3>
          <p className="text-sm mb-2 text-gray-300">${item.price}</p>
        </div>
        <p className="text-sm mb-2 text-gray-300">{item.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              src={item.image}
              alt={item.name}
              className="w-10 h-10 rounded-full"
            />
            <p className="text-sm mb-2 text-gray-300 ml-2">{item.name}</p>
          </div>
          <p className="text-sm mb-2 text-gray-300">{item.date}</p>
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
