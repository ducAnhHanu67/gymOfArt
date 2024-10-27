import { useState } from 'react';
import emailjs from 'emailjs-com';

const Payment: React.FC = () => {
    const [email, setEmail] = useState<string>(''); // Người dùng nhập email người nhận
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [postalCode, setPostalCode] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [discountCode, setDiscountCode] = useState<string>('');

    const totalAmount = 10000; // Tổng số tiền

    const handleOrder = async () => {
        const fullName = `${firstName} ${lastName}`;

        // Tạo URL VietQR
        const vietQRUrl = `https://img.vietqr.io/image/970436-${phoneNumber}-default.png?amount=${totalAmount}&addInfo=${encodeURIComponent(
            `Thanh toán đơn hàng của ${fullName}`
        )}`;

        // Cấu hình dữ liệu gửi email, bao gồm `to_email`
        const orderData = {
            to_email: email, // Đây là email người nhận
            email,
            fullName,
            address,
            country,
            postalCode,
            phoneNumber,
            totalAmount,
            vietQRUrl,
            discountCode,
        };

        try {
            // Gửi email với emailjs
            await emailjs.send(
                'service_n2aow8a',       // Thay bằng Service ID của bạn
                'template_xfl5odt',      // Thay bằng Template ID của bạn
                orderData,
                'd_5IRrd1Kz66u6b2U'      // Thay bằng Public Key của bạn
            );
            alert('Đơn hàng của bạn đã được gửi thành công!');
        } catch (error) {
            console.error('Lỗi khi gửi email:', error);
            alert('Gửi email thất bại. Vui lòng thử lại sau.');
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

                    {/* Thông tin sản phẩm */}
                    <div>
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
                            <span>{totalAmount}</span>
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
