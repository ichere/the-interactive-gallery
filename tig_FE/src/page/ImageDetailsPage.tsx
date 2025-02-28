import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import CommentSection from "../components/CommentSection";

interface ImageDetails {
  id: string;
  urls: { regular: string };
  alt_description?: string;
  user?: { name: string };
  tags?: { title: string }[];
}

const ImageDetailsPage = () => {
  const { id } = useParams();
  const [image, setImage] = useState<ImageDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setError("Invalid image ID.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:4000/api/images/${id}`)
      .then((res) => {
        if (!res.data || !res.data.urls) {
          throw new Error("Invalid API response");
        }
        setImage(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching image details:", err);
        setError("Failed to load image details. Please try again.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner size="xl" mt={5} />;

  if (error)
    return (
      <Alert status="error" mt={5}>
        <AlertIcon />
        {error}
      </Alert>
    );

  if (!image) return <Text mt={5}>Error loading image details.</Text>;

  return (
    <Box p={6} maxW="800px" mx="auto">
      {/* Styled Image Card */}
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
        bg="white"
      >
        <Image
          src={image.urls?.regular || ""}
          alt={image.alt_description || "No description available"}
          objectFit="cover"
          width="100%"
          height="450px"
        />

        {/* Image Details */}
        <VStack align="start" spacing={4} p={4}>
          <Text fontSize="lg" fontWeight="bold">
            Author: {image.user?.name || "Unknown"}
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
        </VStack>
      </Box>

      {/* Comment Section Below */}
      <Box mt={6}>
        <CommentSection imageId={image.id} />
      </Box>

      {/* Back Button with Arrow */}
      <Button
        onClick={() => navigate("/")}
        colorScheme="blue"
        mt={4}
        leftIcon={<ArrowBackIcon />}
      >
        Back to Gallery
      </Button>
    </Box>
  );
};

export default ImageDetailsPage;
