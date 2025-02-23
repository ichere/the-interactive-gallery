import { Box, Heading, Text, Input, Button, VStack, Alert, AlertIcon } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

interface Comment {
  id: number;
  username: string;
  text: string;
  created_at: string;
}

const CommentSection = ({ imageId }: { imageId: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  //  Fetch Comments
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/comments/${imageId}`)
      .then((res) => setComments(res.data))
      .catch(() => setError("Failed to load comments"));
  }, [imageId]);

  //  Submit Comment
  const submitComment = async () => {
    if (text.length < 3) {
      setError("Comment must be at least 3 characters long");
      return;
    }
    setError("");

    try {
      const response = await axios.post("http://localhost:4000/api/comments", {
        imageId,
        username: "Guest",
        text,
      });
      setComments([response.data, ...comments]); // Add new comment to list
      setText(""); // Clear input field
    } catch {
      setError("Failed to post comment");
    }
  };

  return (
    <Box mt={4}>
      <Heading fontSize="lg" fontWeight="bold">
        Comments
      </Heading>

      {/*  Show Error Message if Input is Invalid */}
      {error && (
        <Alert status="error" mt={2}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      {/*  Comment List */}
      <VStack align="start" mt={3} spacing={2} maxH="200px" overflowY="auto">
        {comments.length === 0 ? (
          <Text color="gray.500">No comments yet. Be the first!</Text>
        ) : (
          comments.map((comment) => (
            <Box key={comment.id} borderBottomWidth="1px" py={1} w="full">
              <Text fontSize="sm" fontWeight="bold">
                {comment.username}
              </Text>
              <Text fontSize="sm">{comment.text}</Text>
              <Text fontSize="xs" color="gray.500">
                {new Date(comment.created_at).toLocaleString()}
              </Text>
            </Box>
          ))
        )}
      </VStack>

      {/*  Comment Input */}
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        borderWidth="1px"
        borderRadius="md"
        p={2}
        w="full"
        mt={3}
        placeholder="Add a comment..."
      />

      {/*  Submit Button */}
      <Button
        onClick={submitComment}
        bg="blue.500"
        color="white"
        px={4}
        py={2}
        mt={2}
        borderRadius="md"
        isDisabled={text.length < 3} // Prevent short comments
      >
        Submit
      </Button>
    </Box>
  );
};

export default CommentSection;
