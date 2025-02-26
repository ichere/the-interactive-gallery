import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Image,
  Text,
  Flex,
  Badge,
  VStack,
  Spinner,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CommentSection from "../components/CommentSection";

interface ImageDetails {
  id: string;
  urls: { regular: string };
  alt_description: string;
  user: { name: string };
  tags?: { title: string }[];
}

const ImageDetailsPage = () => {
  const { id } = useParams();
  const [image, setImage] = useState<ImageDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/images/${id}`)
      .then((res) => {
        setImage(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching image details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner size="xl" />;
  if (!image) return <Text>Error loading image details.</Text>;

  return (
    <Box p={6} maxW="800px" mx="auto">
      {/* Full-size Image */}
      <Image
        src={image.urls.regular}
        alt={image.alt_description}
        borderRadius="md"
        maxH="500px"
        objectFit="contain"
      />

      {/* Image Details */}
      <VStack align="start" spacing={4} mt={4}>
        <Text fontSize="lg" fontWeight="bold">
          Author: {image.user.name}
        </Text>

        <Text fontSize="md" color="gray.600">
          {image.alt_description || "No description available"}
        </Text>

        {/* Tags */}
        {image.tags && image.tags.length > 0 && (
          <Flex wrap="wrap" gap={2}>
            {image.tags.map((tag, index) => (
              <Badge key={index} colorScheme="blue">
                #{tag.title}
              </Badge>
            ))}
          </Flex>
        )}

        {/* Comments Section */}
        <CommentSection imageId={image.id} />

        {/* Back Button */}
        <Button onClick={() => navigate("/")} colorScheme="blue">
          Back to Gallery
        </Button>
      </VStack>
    </Box>
  );
};

export default ImageDetailsPage;
