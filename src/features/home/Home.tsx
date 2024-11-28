import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { Box, Typography, Paper, Button, Grid } from '@mui/material';
import './Home.css';

const Home: React.FC = () => {
  const [images, setImages] = useState<string[]>([]); // State để lưu URL ảnh

  // Hàm fetch dữ liệu từ API
  const fetchArtworkImages = async () => {
    try {
      const response = await fetch(
        'https://gymofart.azurewebsites.net/api/Artwork/admin-role',
        {
          method: 'GET',
          headers: {
            accept: 'text/plain',
          },
        }
      );
      const data = await response.json();

      // Lấy danh sách URL ảnh từ API response
      const imageUrls = data
        .map((item: any) => item?.image?.imageUrl)  // Lấy các giá trị imageUrl
        .filter((url: any) => url !== undefined);

      setImages(imageUrls); // Cập nhật state
    } catch (error) {
      console.error('Error fetching artwork data:', error);
    }
  };

  useEffect(() => {
    fetchArtworkImages(); // Gọi hàm fetch khi component được mount
  }, []);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <Box className="home-container">
      {/* Main Content */}
      <Box className="home-main-content">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {images.map((src, index) => (
            <Paper key={index} className="masonry-item">
              <Box
                component="img"
                src={src}
                alt={`Artwork ${index + 1}`}
                sx={{ width: '100%', borderRadius: 1 }}
              />
            </Paper>
          ))}
        </Masonry>
      </Box>

      {/* Sidebar */}
      <Box className="home-sidebar">
        {/* Popular Section */}
        <Paper className="popular-section" sx={{ padding: 2, backgroundColor: '#333348', borderRadius: 3 }}>
          <Typography variant="h6" color='white' align="center" gutterBottom>
            Popular
          </Typography>
          <Grid container spacing={1}>
            {images.slice(0, 4).map((src, index) => (
              <Grid item xs={6} key={index}>
                <Box
                  component="img"
                  src={src}
                  alt={`popular ${index}`}
                  sx={{
                    width: '100%',
                    height: 100, // Chiều cao cố định cho ảnh
                    objectFit: 'cover', // Đảm bảo ảnh được cắt vừa khung
                    borderRadius: 2,
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Button variant="contained" fullWidth sx={{ marginTop: 2, backgroundColor: '#2D2F44', color: 'white', borderRadius: 2 }}>
            View All
          </Button>
        </Paper>

        {/* Trending Section */}
        <Paper sx={{ backgroundColor: '#333348', padding: 2, marginBottom: 2, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ color: 'red', marginBottom: 1 }}>
            Trending
          </Typography>
          <Box>
            {['#Character design', '#conceptart', '#background_game'].map((tag, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{ color: 'gray', marginBottom: 0.5 }}
              >
                {tag}
              </Typography>
            ))}
          </Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#3b5998',
              color: 'white',
              marginTop: 1,
              borderRadius: 2,
              fontSize: '0.8rem',
              padding: '4px 8px',
              textTransform: 'none'
            }}
          >
            Show more
          </Button>
        </Paper>

        {/* Notifications */}
        <Paper sx={{ backgroundColor: '#333348', padding: 2, marginBottom: 2, display: 'flex', alignItems: 'center', borderRadius: 3 }}>
          <Box sx={{ marginRight: 1 }}>📬</Box>
          <Typography>12</Typography>
        </Paper>

        {/* Buy Coffee Button */}
        <Button variant="contained" fullWidth sx={{ backgroundColor: '#ff3366', marginTop: 2, borderRadius: 2 }}>
          Buy GOA a coffee
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
