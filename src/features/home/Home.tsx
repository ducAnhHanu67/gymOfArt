import React from 'react';
import Masonry from 'react-masonry-css';
import { Box, Typography, Paper, Button, Grid } from '@mui/material';
import './Home.css';

// Mảng chứa URL ngẫu nhiên của 16 ảnh từ Internet
const dummyImages = [
  "https://picsum.photos/300/200?random=1",
  "https://picsum.photos/300/200?random=2",
  "https://picsum.photos/300/300?random=3",
  "https://picsum.photos/200/300?random=4",
  "https://picsum.photos/400/300?random=5",
  "https://picsum.photos/300/400?random=6",
  "https://picsum.photos/250/300?random=7",
  "https://picsum.photos/300/250?random=8",
  "https://picsum.photos/300/200?random=9",
  "https://picsum.photos/300/300?random=10",
  "https://picsum.photos/200/300?random=11",
  "https://picsum.photos/400/300?random=12",
  "https://picsum.photos/300/400?random=13",
  "https://picsum.photos/250/300?random=14",
  "https://picsum.photos/300/250?random=15",
  "https://picsum.photos/300/200?random=16"
];

const trendingTags = [
  { tag: '#Character design', color: 'gray' },
  { tag: '#conceptart', color: 'yellow' },
  { tag: '#background_game', color: 'gray' },
  { tag: '#illustration', color: 'gray' },
  { tag: '#pencil drawing', color: 'gray' },
  { tag: '#Fan-art', color: 'green' },
  { tag: '#fantasy', color: 'gray' }
];

const Home: React.FC = () => {
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
          {dummyImages.map((src, index) => (
            <Paper key={index} className="masonry-item">
              <Box
                component="img"
                src={src}
                alt={`image ${index + 1}`}
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
            {dummyImages.slice(0, 4).map((src, index) => (
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
            {trendingTags.map((tag, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{ color: tag.color, marginBottom: 0.5 }}
              >
                {tag.tag}
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
