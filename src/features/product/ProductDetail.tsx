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

const dummyData: Product = {
    id: "1",
    name: "Christmas Tree 3D",
    price: 20,
    description: "The 3D Christmas tree is a meticulously crafted digital product that brings the festive spirit to life in a virtual space. Fully modeled using 3D software, this tree features realistic details, making it the perfect choice for creative projects, animations, or virtual environments during the holiday season.",
    date: "2023-10-26",
    image: "/path/to/image.png",
    rating: 4.6,
    reviews: [
        { user: "RyoNguyen", comment: "Amazing assets!!! Just want to say the creator is awesome to build this tree.", rating: 5 },
        { user: "Minh Thach", comment: "Good quality, but could use more variations.", rating: 4 },
    ],
    files: 5,
    tags: ["3D assets", "Maya", "Blender"]
};

const ProductDetail: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [item, setItem] = useState<Product | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        // Sử dụng dummy data cho đến khi API hoạt động
        setItem(dummyData);
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
            {/* Thêm ToastContainer để hiển thị thông báo */}
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
                            <Typography color="white">Image Placeholder</Typography>
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
                        <Typography>File: ({item.files})</Typography>
                        <Typography>Quantity: 1</Typography>
                        <Button variant="contained" fullWidth sx={{ backgroundColor: '#ff3366', mt: 2, mb: 1 }} onClick={handleAddToCart}>
                            Add to cart
                        </Button>
                        <Button variant="contained" fullWidth sx={{ backgroundColor: '#3f51b5' }} onClick={handleAddToLibrary}>
                            Add to library
                        </Button>
                    </Paper>

                    <Paper sx={{ backgroundColor: '#2A2A3C', p: 2 }}>
                        <Typography variant="h6" color='white' gutterBottom>Rating & Reviews</Typography>
                        {item.reviews?.map((review, index) => (
                            <Paper key={index} sx={{ backgroundColor: '#333348', p: 2, mb: 2 }}>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="body1" fontWeight="bold">{review.user}</Typography>
                                    <Box display="flex" alignItems="center">
                                        <Typography variant="body2">{review.rating}</Typography>
                                        <Typography color="warning.main" ml={0.5}>★</Typography>
                                    </Box>
                                </Box>
                                <Typography variant="body2" color="textSecondary" mt={1}>{review.comment}</Typography>
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
