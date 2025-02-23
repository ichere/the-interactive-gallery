import { useEffect, useState } from "react";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  Box,
  Button,
  Grid,
  Image,
  Text,
  useDisclosure,
  Flex,
  Badge,
  VStack,
  Divider,
} from "@chakra-ui/react";
import CommentSection from "./CommentSection";

interface Image {
  id: string;
  urls: { regular: string; small: string };
  alt_description: string;
  user: { name: string };
  tags?: { title: string }[];
}

const Gallery = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/images") // Adjust API endpoint if needed
      .then((res) => setImages(res.data))
      .catch((err) => console.error("Error fetching images:", err));
  }, []);

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
    onOpen();
  };

  return (
    <div>
      {/* Modal for Image Details */}
      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalContent maxW="90vw" maxH="90vh">
          <ModalHeader>{selectedImage?.alt_description || "Image Details"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedImage && (
              <Flex direction={{ base: "column", md: "row" }} gap={6}>
                {/* Full-size Image */}
                <Box flex="1" display="flex" justifyContent="center">
                  <Image
                    src={selectedImage.urls.regular}
                    alt={selectedImage.alt_description}
                    borderRadius="md"
                    maxH="80vh"
                    objectFit="contain"
                  />
                </Box>

                {/* Image Details & Comments */}
                <Box flex="1" overflowY="auto" maxH="80vh">
                  <VStack align="start" spacing={4}>
                    <Text fontSize="lg" fontWeight="bold">
                      Author: {selectedImage.user.name}
                    </Text>

                    <Text fontSize="md" color="gray.600">
                      {selectedImage.alt_description || "No description available"}
                    </Text>

                    {/* Tags */}
                    {selectedImage.tags && selectedImage.tags.length > 0 && (
                      <Flex wrap="wrap" gap={2}>
                        {selectedImage.tags.map((tag, index) => (
                          <Badge key={index} colorScheme="blue">
                            #{tag.title}
                          </Badge>
                        ))}
                      </Flex>
                    )}

                    <Divider />

                    {/* Comments Section */}
                    <CommentSection imageId={selectedImage.id} />
                  </VStack>
                </Box>
              </Flex>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Image Gallery */}
      <Flex justify="center">
        <Grid
          templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }}
          gap={6}
          p={4}
        >
          {images.map((image) => (
            <Box
              key={image.id}
              onClick={() => handleImageClick(image)}
              cursor="pointer"
              p={3}
              borderWidth="1px"
              borderRadius="md"
              boxShadow="md"
              _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
            >
              <Image src={image.urls.small} alt={image.alt_description} borderRadius="md" />
              <Text fontSize="md" fontWeight="bold" mt={2}>
                {image.alt_description || "Untitled"}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {image.user.name}
              </Text>
            </Box>
          ))}
        </Grid>
      </Flex>
    </div>
  );
};

export default Gallery;
