import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Image, Text, Flex } from "@chakra-ui/react";

interface Image {
  id: string;
  urls: { small: string };
  alt_description: string;
  user: { name: string };
}

const Gallery = () => {
  const [images, setImages] = useState<Image[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/images")
      .then((res) => setImages(res.data))
      .catch((err) => console.error("Error fetching images:", err));
  }, []);

  return (
    <Flex justify="center">
      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }}
        gap={6}
        p={4}
      >
        {images.map((image) => (
          <Box
            key={image.id}
            onClick={() => navigate(`/image/${image.id}`)}
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
  );
};

export default Gallery;
