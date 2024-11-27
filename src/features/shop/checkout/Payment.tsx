import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store'; // Import RootState để lấy dữ liệu từ store

const Payment: React.FC = () => {
    const [email, setEmail] = useState<string>(''); // Người dùng nhập email người nhận
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [postalCode, setPostalCode] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [discountCode, setDiscountCode] = useState<string>('');

    // Lấy danh sách sản phẩm trong giỏ hàng từ Redux store
    const cart = useSelector((state: RootState) => state.cartLibrary.cart);

    // Tính tổng tiền từ giỏ hàng
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
    // const totalAmount = 3000;

    const handleOrder = async () => {
        const fullName = `${firstName} ${lastName}`;

        // Cấu hình dữ liệu cho yêu cầu gửi đến server
        const orderData = {
            email,
            fullName,
            address,
            country,
            postalCode,
            phoneNumber,
            totalAmount,
            discountCode,
            items: cart.map(item => ({
                name: item.name,
                quantity: 1, // Giả định số lượng là 1 (có thể thay đổi nếu cần)
                price: item.price,
            })),
        };

        try {
            // Gửi yêu cầu đến server Express
            const response = await fetch("https://begymofart.onrender.com/create-embedded-payment-link", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

            // Kiểm tra phản hồi từ server
            const result = await response.json();
            if (response.ok) {
                // Nếu thành công, chuyển hướng người dùng đến liên kết thanh toán
                window.location.href = result.checkoutUrl;
                console.log('okeke', result);


            } else {
                console.error("Failed to create payment link:", result.message);
                alert("Gửi yêu cầu thanh toán thất bại. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu đến server:", error);
            alert("Gửi yêu cầu thất bại. Vui lòng thử lại sau.");
        }
    };

    return (
        <div className="bg-[#1a1b2e] min-h-screen text-white p-8">
            <div className="max-w-6xl mx-auto bg-[#2c2c3f] p-6 rounded-lg">
                <h1 className="text-2xl font-semibold mb-6">Customer Info</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Thông tin khách hàng */}
                    <div className="space-y-4">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="w-full p-3 rounded bg-[#3c3c4f] border border-[#f97066]"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="flex gap-4">
                            <input
                                type="text"
                                placeholder="First name"
                                className="w-full p-3 rounded bg-[#3c3c4f] border border-[#f97066]"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Last name"
                                className="w-full p-3 rounded bg-[#3c3c4f] border border-[#f97066]"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Address"
                            className="w-full p-3 rounded bg-[#3c3c4f] border border-[#f97066]"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Country"
                            className="w-full p-3 rounded bg-[#3c3c4f] border border-[#f97066]"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        <div className="flex gap-4">
                            <input
                                type="text"
                                placeholder="Postal code"
                                className="w-full p-3 rounded bg-[#3c3c4f] border border-[#f97066]"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Phone number"
                                className="w-full p-3 rounded bg-[#3c3c4f] border border-[#f97066]"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Thông tin sản phẩm trong giỏ hàng */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center p-3 rounded bg-[#3c3c4f]"
                                >
                                    {/* Image */}
                                    <div className="w-16 h-16 flex-shrink-0">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover rounded"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-700 flex items-center justify-center rounded">
                                                <span className="text-sm text-gray-400">No Image</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 pl-4">
                                        <span className="block text-white font-medium">{item.name}</span>
                                        <span className="block text-gray-400 text-sm">{item.price} VND</span>
                                    </div>
                                </div>
                            ))}

                        </div>

                        {/* Discount Code */}
                        <div className="flex items-center mt-4 gap-2">
                            <input
                                type="text"
                                placeholder="Discount code"
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                                className="w-full p-3 rounded bg-[#3c3c4f] border border-[#f97066]"
                            />
                        </div>
                        <div className="flex justify-between items-center mt-6 text-lg font-semibold">
                            <span>Total</span>
                            <span>{totalAmount} VND</span>
                        </div>
                    </div>
                </div>

                {/* Nút Order */}
                <div className="mt-6">
                    <button
                        onClick={handleOrder}
                        className="w-full bg-blue-500 text-white p-4 rounded-lg font-semibold hover:bg-blue-600 transition"
                    >
                        Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Payment;
