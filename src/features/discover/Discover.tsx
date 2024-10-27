import React from 'react';
import { Box, Typography, Paper, Button, Avatar, TextField, IconButton } from '@mui/material';
import { Favorite, ChatBubbleOutline, Share, Image, InsertEmoticon, Add } from '@mui/icons-material';
import './Discover.css';  // Import file CSS để tùy chỉnh thanh cuộn

const posts = [
  {
    username: 'A-lam',
    userImage: 'https://picsum.photos/50?random=1',
    image: 'https://picsum.photos/600/300?random=1',
    description: 'The art of an artist\nHello friends, this is one of the scenes from my project in college.',
    likes: 20,
    comments: 12,
    shares: 3,
  },
  {
    username: 'Noah',
    userImage: 'https://picsum.photos/50?random=2',
    image: 'https://picsum.photos/600/300?random=2',
    description: 'The art of an artist\nHello friends, this is one of the scenes from my project in college.',
    likes: 20,
    comments: 12,
    shares: 3,
  },
];

const discussions = [
  { username: 'Phong Van', text: 'Your artwork must be like this...', userImage: 'https://picsum.photos/50?random=3' },
  { username: 'Shiba', text: 'Check my feedback box, you miss this.', userImage: 'https://picsum.photos/50?random=4' },
  { username: 'Tom', text: 'Hey! Check my feedback box, you miss this.', userImage: 'https://picsum.photos/50?random=5' },
];

const Discover: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', backgroundColor: '#1f1f30', color: 'white', minHeight: '100vh', padding: 3 }}>
      {/* Main Content */}
      <Box className="post-section" sx={{ flex: 2.5, paddingRight: 2, height: '100vh', overflowY: 'auto' }}>
        {/* Post Input Area */}
        <Paper sx={{ padding: 2, backgroundColor: '#333348', borderRadius: 2, marginBottom: 3 }}>
          <Box display="flex" alignItems="center" mb={1}>
            <Avatar src="https://picsum.photos/50?random=6" />
            <TextField
              variant="outlined"
              placeholder="How are you today?"
              fullWidth
              sx={{
                backgroundColor: '#1f1f30',
                marginLeft: 2,
                borderRadius: 2,
                input: { color: 'white' },
              }}
            />
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <IconButton color="primary">
                <Image />
              </IconButton>
              <IconButton color="primary">
                <InsertEmoticon />
              </IconButton>
              <IconButton color="primary">
                <Add />
              </IconButton>
            </Box>
            <Button variant="contained" sx={{ backgroundColor: '#3b5998', color: 'white' }}>Post</Button>
          </Box>
        </Paper>

        {/* Post List */}
        {posts.map((post, index) => (
          <Paper key={index} sx={{ padding: 2, backgroundColor: '#333348', borderRadius: 2, marginBottom: 3 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar src={post.userImage} />
              <Box ml={2} flex={1}>
                <Typography variant="body1" fontWeight="bold">
                  {post.username}
                </Typography>
                <Typography variant="body2" color="gray">
                  {post.description}
                </Typography>
              </Box>
              <Button variant="contained" sx={{ backgroundColor: '#3b5998', color: 'white' }}>
                Follow
              </Button>
            </Box>
            <Box
              component="img"
              src={post.image}
              alt="post"
              sx={{ width: '100%', borderRadius: 2, marginBottom: 2 }}
            />
            <Box display="flex" justifyContent="space-around" color="gray">
              <Box display="flex" alignItems="center">
                <Favorite fontSize="small" />
                <Typography ml={0.5}>{post.likes}</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <ChatBubbleOutline fontSize="small" />
                <Typography ml={0.5}>{post.comments}</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Share fontSize="small" />
                <Typography ml={0.5}>{post.shares}</Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Sidebar */}
      <Box sx={{ width: 300, paddingLeft: 2 }}>
        <Box
          sx={{
            position: 'fixed',
            width: 300,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Discussion Section */}
          <Paper sx={{ backgroundColor: '#333348', padding: 2, borderRadius: 2, marginBottom: 2 }}>
            <Typography variant="h6" gutterBottom>
              Discussion
            </Typography>
            {discussions.map((discussion, index) => (
              <Box key={index} display="flex" alignItems="center" mb={1}>
                <Avatar src={discussion.userImage} />
                <Box ml={2}>
                  <Typography variant="body2" fontWeight="bold">
                    {discussion.username}
                  </Typography>
                  <Typography variant="body2" color="gray">
                    {discussion.text}
                  </Typography>
                </Box>
              </Box>
            ))}
            <Button variant="contained" fullWidth sx={{ backgroundColor: '#000', color: 'white', mt: 1 }}>
              View All
            </Button>
          </Paper>

          {/* Buy Coffee Button */}
          <Box textAlign="center">
            <Paper sx={{ backgroundColor: '#333348', padding: 2, borderRadius: 2 }}>
              <Typography variant="body2">Buy GOA a coffee</Typography>
              <Button variant="contained" fullWidth sx={{ backgroundColor: '#ff3366', color: 'white', mt: 1 }}>
                Buy
              </Button>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Discover;
