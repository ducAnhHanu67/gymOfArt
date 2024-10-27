import { useState } from 'react';

const Payment: React.FC = () => {
    const [discountCode, setDiscountCode] = useState<string>('');

    const handleApplyDiscount = (): void => {
        // Xử lý mã giảm giá
        alert(`Mã giảm giá đã được áp dụng: ${discountCode}`);
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
                        />
                        <div className="flex gap-4">
                            <input
                                type="text"
                                placeholder="First name"
                                className="w-full p-3 rounded bg-[#3c3c4f] border border-[#f97066]"
                            />
                            <input
                                type="text"
                                placeholder="Last name"
                                className="w-full p-3 rounded bg-[#3c3c4f] border border-[#f97066]"
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Address"
                            className="w-full p-3 rounded bg-[#3c3c4f] border border-[#f97066]"
                        />
                        <input
                            type="text"
                            placeholder="Country"
                            className="w-full p-3 rounded bg-[#3c3c4f] border border-[#f97066]"
                        />
                        <div className="flex gap-4">
                            <input
                                type="text"
                                placeholder="Postal code"
                                className="w-full p-3 rounded bg-[#3c3c4f] border border-[#f97066]"
                            />
                            <input
                                type="text"
                                placeholder="Phone number"
                                className="w-full p-3 rounded bg-[#3c3c4f] border border-[#f97066]"
                            />
                        </div>
                        <p className="text-sm text-gray-400">
                            Bạn có thể thanh toán bằng cách CHUYỂN KHOẢN qua ngân hàng hoặc thông qua MOMO.
                        </p>
                        <p className="text-sm text-gray-400">
                            Chúng tôi sẽ không thể hoàn tiền cho bạn nếu sự cố không xuất phát từ GYM OF ART.
                        </p>
                    </div>

                    {/* Thông tin sản phẩm */}
                    <div>
                        <h1 className="text-2xl font-semibold mb-6">Asset Info</h1>
                        <div className="bg-[#3c3c4f] p-4 rounded-lg flex items-center gap-4">
                            <div className="w-20 h-20 bg-red-500 rounded-md"></div>
                            <div>
                                <h2 className="text-lg font-semibold">Asset's name</h2>
                                <p className="text-sm text-gray-400">Asset for designer</p>
                                <p className="text-sm text-gray-400">18th October, 2023</p>
                            </div>
                        </div>
                        <div className="mt-4 bg-[#3c3c4f] p-4 rounded-lg">
                            <h2 className="text-lg font-semibold mb-2">Files (5)</h2>
                            <ul className="space-y-2 text-sm">
                                <li>ABC.psd</li>
                                <li>ABC.obj</li>
                                <li>ABC.jpeg</li>
                                <li>tutorial.mp4</li>
                                <li>license.txt</li>
                            </ul>
                        </div>
                        <div className="flex items-center mt-4 gap-2">
                            <input
                                type="text"
                                placeholder="Discount code"
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                                className="w-full p-3 rounded bg-[#3c3c4f] border border-[#f97066]"
                            />
                            <button
                                onClick={handleApplyDiscount}
                                className="bg-[#f97066] text-white px-4 py-3 rounded font-semibold hover:bg-[#f7c5a5] transition"
                            >
                                Apply
                            </button>
                        </div>
                        <div className="flex justify-between items-center mt-6 text-lg font-semibold">
                            <span>Total</span>
                            <span>0.99$</span>
                        </div>
                    </div>
                </div>

                {/* Nút Tiếp Tục */}
                <div className="mt-6">
                    <button className="w-full bg-blue-500 text-white p-4 rounded-lg font-semibold hover:bg-blue-600 transition">
                        Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Payment;
