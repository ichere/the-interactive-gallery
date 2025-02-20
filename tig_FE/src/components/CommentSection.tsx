import { Box, Heading, Text, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

interface Comment {
    id: number;
    username: string;
    text: string;
  }

const CommentSection = ({ imageId }: { imageId: string }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [text, setText] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:4000/api/comments/${imageId}`).then((res) => setComments(res.data));
    }, [imageId]);

    const submitComment = async () => {
        await axios.post("http://localhost:4000/api/comments", { imageId, username: "Guest", text });
        setComments([...comments, { id: Date.now(), username: "Guest", text }]);
        setText("");
    };
    return(

        <Box mt={4}>
            <Heading fontSize="lg" fontWeight="bold">Comments</Heading>
            {comments.map((comment) => (
                <Text key={comment.id} borderBottomWidth="1px" py={1}>
                {comment.username}: {comment.text}
                </Text>
            ))}
            <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                borderWidth="1px"
                borderRadius="md"
                p={2}
                w="full"
                placeholder="Add a comment"
            />
            <Button
                onClick={submitComment}
                bg="blue.500"
                color="white"
                px={4}
                py={2}
                mt={2}
                borderRadius="md"
            >
                Submit
            </Button>
        </Box>
    );
}

export default CommentSection;