import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios để gọi API
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

const Discover: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);  // State để lưu các bài viết
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
      // Chú ý: Bạn cần update lại state khi thêm bình luận
      setCommentText(''); // Reset lại ô nhập bình luận
    }
  };
  // Hàm để gửi bài đăng lên API
  const handlePost = async () => {
    if (!postText || !uploadedImage) {
      alert('Vui lòng điền đầy đủ thông tin và chọn ảnh.');
      return;
    }

    const formData = new FormData();
    formData.append('Title', postText); // Thêm tiêu đề
    formData.append('Description', ''); // Thêm mô tả, bạn có thể thay đổi sau
    const imageBlob = await fetch(uploadedImage).then(res => res.blob());
    formData.append('Image', imageBlob, 'image.png'); // Thêm ảnh

    try {
      const response = await axios.post(
        'https://gymofart.azurewebsites.net/api/Artwork/upload-artwork',
        formData,
        {
          headers: {
            'accept': 'text/plain',
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Bài đăng thành công:', response.data);

      // Sau khi gửi bài thành công, gọi lại API để lấy dữ liệu mới
      const postsResponse = await axios.get('https://gymofart.azurewebsites.net/api/Artwork/discovery');
      // Sắp xếp các bài viết sao cho bài đăng mới nhất được hiển thị lên đầu
      // const sortedPosts = [response.data, ...postsResponse.data];
      setPosts(postsResponse.data); // Cập nhật lại state posts với danh sách bài viết mới

      // Reset lại các giá trị
      setUploadedImage(null); // Reset ảnh sau khi đăng
      setPostText(''); // Reset nội dung bài viết
    } catch (error) {
      console.error('Lỗi khi gửi bài đăng:', error);
      alert('Đã có lỗi xảy ra khi gửi bài đăng.');
    }
  };

  // Gọi API để lấy dữ liệu các bài viết
  useEffect(() => {
    axios.get('https://gymofart.azurewebsites.net/api/Artwork/discovery')
      .then(response => {
        setPosts(response.data);  // Lưu dữ liệu bài viết vào state
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);  // Chỉ gọi một lần khi component được mount

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
            <Button variant="contained" sx={{ backgroundColor: '#3b5998', color: 'white' }} onClick={handlePost} >
              Post
            </Button>
          </Box>
        </Paper>

        {/* Post List */}
        {posts.slice().reverse().map((post, index) => (
          <Paper key={index} sx={{ padding: 2, backgroundColor: '#333348', borderRadius: 2, marginBottom: 3, width: '90%' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar src="https://picsum.photos/50?random=6" />
              <Box sx={{ color: 'white' }} ml={2} flex={1}>
                <Typography variant="body1" fontWeight="bold">
                  {post.artworkName}
                </Typography>
                <Typography variant="body2" color="gray">
                  {post.artworkDescription}
                </Typography>
              </Box>
              <Button variant="contained" sx={{ backgroundColor: '#3b5998', color: 'white' }}>
                Follow
              </Button>
            </Box>
            {post.artworkUrl && (
              <Box
                component="img"
                src={post.artworkUrl}
                alt="artwork"
                sx={{ width: '100%', borderRadius: 2, marginBottom: 2, cursor: 'pointer' }}
                onClick={() => handleOpenPostDialog(post)}
              />
            )}
            <Box display="flex" justifyContent="space-around" color="gray">
              <Box display="flex" alignItems="center">
                <Favorite fontSize="small" />
                <Typography ml={0.5}>0</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <ChatBubbleOutline fontSize="small" />
                <Typography ml={0.5}>0</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Share fontSize="small" />
                <Typography ml={0.5}>0</Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Sidebar */}
      <Box sx={{ width: 300, paddingLeft: 2 }}>
        <Box
          sx={{
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
            {/* Render discussions */}
            {/* For now you can keep them as static or modify */}
          </Paper>
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

      {/* Post Detail Dialog */}
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
        <DialogContent sx={{ height: '100%', padding: 0 }}>
          <Box display="flex" flexDirection="row" alignItems="stretch" height="100%">
            {/* Phần ảnh */}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                width: '70%',
                height: '100%',
                borderRadius: 2,
                background: '#494949'
              }}
            >
              <Box
                component="img"
                src={selectedPost?.artworkUrl}
                alt="post"
                sx={{
                  width: '100%',
                  height: '60%',
                  borderRadius: 2,
                  objectFit: 'cover'
                }}
              />
            </Box>

            {/* Phần chi tiết bài viết */}
            <Box sx={{ width: '30%', height: '100%', padding: 3, background: '#333348' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                {selectedPost?.artworkName}
              </Typography>
              <Typography variant="body1" sx={{ color: 'gray', marginTop: 1 }}>
                {selectedPost?.artworkDescription}
              </Typography>

              {/* Bình luận */}
              <Box mt={3}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  sx={{
                    backgroundColor: '#1f1f30',
                    borderRadius: 2,
                    input: { color: 'white' },
                  }}
                />
                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddComment}
                  >
                    Comment
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Discover;
