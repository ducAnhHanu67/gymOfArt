import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  Typography,
  Paper,
  Button,
  Avatar,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { Favorite, ChatBubbleOutline, Share, Image, InsertEmoticon, Add } from '@mui/icons-material';

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
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [postText, setPostText] = useState<string>('');
  const [openPostDialog, setOpenPostDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [commentText, setCommentText] = useState<string>('');

  // Hàm mở và đóng dialog
  const handleOpenImageDialog = () => setOpenImageDialog(true);
  const handleCloseImageDialog = () => setOpenImageDialog(false);

  // Xử lý khi người dùng chọn ảnh
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setUploadedImage(URL.createObjectURL(file)); // Hiển thị ảnh xem trước
      handleCloseImageDialog(); // Đóng dialog sau khi tải ảnh
    }
  };

  // Hàm mở dialog cho post khi click vào ảnh
  const handleOpenPostDialog = (post: any) => {
    setSelectedPost(post);
    setOpenPostDialog(true);
  };
  const handleClosePostDialog = () => setOpenPostDialog(false);

  // Hàm xử lý khi nhấn nút thêm bình luận
  const handleAddComment = () => {
    if (commentText) {
      const newComment = {
        username: 'Current User',
        text: commentText,
        userImage: 'https://picsum.photos/50?random=6',
      };
      discussions.push(newComment); // Thêm bình luận mới vào danh sách
      setCommentText(''); // Reset lại ô nhập bình luận
    }
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#1f1f30', color: 'white', minHeight: '100vh', padding: 3 }}>
      {/* Main Content */}
      <Box
        className="post-section"
        sx={{
          flex: 8, // Tăng tỷ lệ chiều rộng của phần này để chiếm 80%
          paddingRight: 2,
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        {/* Post Input Area */}
        <Paper sx={{ padding: 2, backgroundColor: '#333348', borderRadius: 2, marginBottom: 3, width: '90%' }}>
          <Box display="flex" alignItems="center" mb={1}>
            <Avatar src="https://picsum.photos/50?random=6" />
            <Box alignItems="center" ml={2} flex={1}>
              <TextField
                variant="outlined"
                placeholder="How are you today?"
                fullWidth
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                sx={{
                  backgroundColor: '#1f1f30',
                  borderRadius: 2,
                  input: { color: 'white' },
                }}
              />

              {/* Hiển thị ảnh xem trước */}
              {uploadedImage && (
                <Box ml={2} mt={2}>
                  <Box component="img" src={uploadedImage} alt="Preview" sx={{ width: 60, height: 60, borderRadius: 1 }} />
                </Box>
              )}
            </Box>
          </Box>

          {/* Nút điều khiển */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
            <Box>
              <IconButton color="primary" onClick={handleOpenImageDialog}>
                <Image />
              </IconButton>
              <IconButton color="primary">
                <InsertEmoticon />
              </IconButton>
              <IconButton color="primary">
                <Add />
              </IconButton>
            </Box>
            <Button variant="contained" sx={{ backgroundColor: '#3b5998', color: 'white' }}>
              Post
            </Button>
          </Box>
        </Paper>

        {/* Post List */}
        {posts.map((post, index) => (
          <Paper key={index} sx={{ padding: 2, backgroundColor: '#333348', borderRadius: 2, marginBottom: 3, width: '90%', }}>
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar src={post.userImage} />
              <Box sx={{ color: 'white' }} ml={2} flex={1}>
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
            {post.image && (
              <Box
                component="img"
                src={post.image}
                alt="post"
                sx={{ width: '100%', borderRadius: 2, marginBottom: 2, cursor: 'pointer' }}
                onClick={() => handleOpenPostDialog(post)}
              />
            )}
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
            // position: 'fixed',
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

      {/* Image Upload Dialog */}
      <Dialog open={openImageDialog} onClose={handleCloseImageDialog}>
        <DialogTitle>Upload Image</DialogTitle>
        <DialogContent>
          <Button variant="contained" component="label" fullWidth sx={{ marginBottom: 2 }}>
            Select Image
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openPostDialog}
        onClose={handleClosePostDialog}
        maxWidth="xl"
        fullWidth={false}
        sx={{
          '& .MuiDialog-paper': {
            width: 1200, // Chiều rộng 1200
            height: 900, // Chiều cao 900
            maxWidth: 'none',
          },
        }}
      >

        <DialogContent sx={{ height: '100%', padding: 0 }}> {/* Trừ chiều cao của DialogTitle */}
          <Box display="flex" flexDirection="row" alignItems="stretch" height="100%">
            {/* Phần ảnh */}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                width: '70%',  // Đặt phần chứa ảnh chiếm 70% chiều rộng
                height: '100%', // Chiều cao chiếm toàn bộ
                borderRadius: 2,
                background: '#494949'
              }}
            >
              <Box
                component="img"
                src={selectedPost?.image}
                alt="post"
                sx={{
                  width: '100%',         // Đặt chiều rộng ảnh là 70% của phần chứa ảnh
                  height: '60%',        // Đặt chiều cao ảnh là 60% của phần chứa ảnh
                  borderRadius: 2,
                  objectFit: 'contain', // Đảm bảo ảnh giữ nguyên tỉ lệ trong giới hạn
                }}
              />
            </Box>

            {/* Phần comment */}
            <Box width="30%" sx={{ backgroundColor: '#28283b', padding: 2, borderRadius: 2, height: '100%', overflowY: 'auto' }}>
              {/* Thumbnail, Button Follow, and Description */}
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar src={selectedPost?.userImage} sx={{ width: 50, height: 50 }} />
                <Box ml={2} flex={1}>
                  <Typography variant="body1" fontWeight="bold" color="white">
                    {selectedPost?.username}
                  </Typography>
                  <Typography variant="body2" color="gray">
                    @{selectedPost?.username}23
                  </Typography>
                </Box>
                <Button variant="contained" sx={{ backgroundColor: '#3b5998', color: 'white' }}>
                  Follow
                </Button>
              </Box>

              {/* Description */}
              <Typography variant="body2" color="white" mb={2}>
                {selectedPost?.description}
              </Typography>

              {/* Icon Section */}
              <Box display="flex" justifyContent="space-around" color="gray" mb={2}>
                <Box display="flex" alignItems="center">
                  <Favorite fontSize="small" />
                  <Typography ml={0.5}>{selectedPost?.likes}</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <ChatBubbleOutline fontSize="small" />
                  <Typography ml={0.5}>{selectedPost?.comments}</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Share fontSize="small" />
                  <Typography ml={0.5}>{selectedPost?.shares}</Typography>
                </Box>
              </Box>

              {/* Comment Input */}
              <Box display="flex" alignItems="center" mb={2}>
                <TextField
                  variant="outlined"
                  placeholder="Add a comment..."
                  fullWidth
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  sx={{
                    backgroundColor: '#1f1f30',
                    borderRadius: 2,
                    input: { color: 'white' },
                  }}
                />
                <Button
                  onClick={handleAddComment}
                  variant="contained"
                  sx={{
                    marginLeft: 1,
                    backgroundColor: '#e74863',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#d3cbc6'
                    }
                  }}
                >
                  <SendIcon sx={{ color: 'white' }} />
                </Button>
              </Box>

              {/* Display Comments */}
              {discussions.map((discussion, index) => (
                <Box key={index} display="flex" alignItems="center" mb={1}>
                  <Avatar src={discussion.userImage} />
                  <Box ml={2}>
                    <Typography variant="body2" color="white" fontWeight="bold">
                      {discussion.username}
                    </Typography>
                    <Typography variant="body2" color="gray">
                      {discussion.text}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>



    </Box>
  );
};

export default Discover;
