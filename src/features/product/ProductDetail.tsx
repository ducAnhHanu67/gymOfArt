import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Button, Paper, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart, addToLibrary } from '../../redux/cartLibrarySlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    date: string;
    image?: string;
    rating?: number;
    reviews?: { user: string; comment: string; rating: number }[];
    files?: number;
    tags?: string[];
}

const ProductDetail: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [item, setItem] = useState<Product | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://gymofart.azurewebsites.net/api/Product/${productId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }
                const data = await response.json();
                console.log(data, 'dataaa');


                // Chuyển đổi dữ liệu API thành định dạng cần thiết cho component
                const productData: Product = {
                    id: data.product.productId,
                    name: data.product.productName,
                    price: data.product.price / 1000, // Chuyển giá sang đơn vị nghìn
                    description: data.product.productType,
                    date: new Date(data.product.createdAt).toLocaleDateString(),
                    image: data.imageUrl,
                    rating: 4.6, // Thêm rating tạm thời (giá trị giả định nếu không có)
                    reviews: [
                        { user: "RyoNguyen", comment: "Amazing assets!!! Just want to say the creator is awesome to build this tree.", rating: 5 },
                        { user: "Minh Thach", comment: "Good quality, but could use more variations.", rating: 4 },
                    ], // Thêm reviews tạm thời (nếu API chưa cung cấp)
                    files: 5,
                    tags: ["3D assets", "Maya", "Blender"]
                };
                setItem(productData);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [productId]);

    if (!item) return <div>Loading...</div>;

    const handleAddToCart = () => {
        dispatch(addToCart(item));
        toast.success("Added product to Store!", { autoClose: 1000 });
    };

    const handleAddToLibrary = () => {
        dispatch(addToLibrary(item));
        toast.success("Added product to library!", { autoClose: 1000 });
    };

    return (
        <Box className="product-detail" sx={{ backgroundColor: '#1F1F30', color: 'white', p: 4 }}>
            <ToastContainer />

            <Typography variant="h4" gutterBottom>{item.name}</Typography>
            <Box display="flex" alignItems="center" mt={1}>
                <Typography variant="body2" color="white">By HenrySmith09</Typography>
                <Box display="flex" alignItems="center">
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{item.rating}</Typography>
                    <Typography variant="body2" color="warning.main" ml={1}>★</Typography>
                    <Typography variant="body2" color="textSecondary" ml={1}>({item.reviews?.length} reviews)</Typography>
                </Box>
            </Box>

            <Box display="flex" gap={1} mt={2}>
                {item.tags?.map((tag, index) => (
                    <Paper key={index} sx={{ backgroundColor: '#333348', p: 0.5, borderRadius: 1, color: 'white' }}>
                        <Typography variant="body2">{tag}</Typography>
                    </Paper>
                ))}
            </Box>

            <Grid container spacing={4} mt={3}>
                <Grid item xs={8}>
                    <Paper sx={{ backgroundColor: '#333348', p: 2 }}>
                        <Box sx={{ height: 300, backgroundColor: '#ff3366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src={item.image} alt={item.name} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                        </Box>
                        <Box display="flex" gap={1} mt={2}>
                            <Box sx={{ width: 80, height: 80, backgroundColor: '#ff3366' }} />
                            <Box sx={{ width: 80, height: 80, backgroundColor: '#ff3366' }} />
                            <Box sx={{ width: 80, height: 80, backgroundColor: '#ff3366' }} />
                        </Box>
                        <Box mt={3}>
                            <Typography variant="h6" color="white" gutterBottom>Description</Typography>
                            <Typography variant="body2" color="white">
                                {item.description}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={4}>
                    <Paper sx={{ backgroundColor: '#2A2A3C', p: 2, mb: 3 }}>
                        <Typography variant="h6" color='white' gutterBottom>{item.name}</Typography>
                        <Typography color='#5a70a2'>File: ({item.files})</Typography>
                        <Typography color='#5a70a2'>Quantity: 1</Typography>
                        <Button variant="contained" fullWidth sx={{ backgroundColor: '#ff3366', mt: 2, mb: 1 }} onClick={handleAddToCart}>
                            Add to cart
                        </Button>
                        <Button variant="contained" fullWidth sx={{ backgroundColor: '#3f51b5' }} onClick={handleAddToLibrary}>
                            Add to library
                        </Button>
                    </Paper>

                    <Paper sx={{ backgroundColor: '#1f1f30', p: 2 }}>
                        <Typography variant="h6" color='white' gutterBottom>Rating & Reviews</Typography>
                        {item.reviews?.map((review, index) => (
                            <Paper key={index} sx={{ backgroundColor: '#333348', p: 2, mb: 2 }}>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography color='#5a70a2' variant="body1" fontWeight="bold">{review.user}</Typography>
                                    <Box display="flex" alignItems="center">
                                        <Typography color='#5a70a2' variant="body2">{review.rating}</Typography>
                                        <Typography color="warning.main" ml={0.5}>★</Typography>
                                    </Box>
                                </Box>
                                <Typography variant="body2" color='#5a70a2' mt={1}>{review.comment}</Typography>
                                <Box display="flex" gap={2} color="gray" mt={1}>
                                    <Typography variant="caption">👍 0</Typography>
                                    <Typography variant="caption">👎 0</Typography>
                                    <Typography variant="caption">Report</Typography>
                                </Box>
                            </Paper>
                        ))}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductDetail;
