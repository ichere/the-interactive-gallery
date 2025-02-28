import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, SimpleGrid, Image, Text, Flex } from "@chakra-ui/react";

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
    <Flex justify="center" p={4}>
      <SimpleGrid
        columns={[1, 2, 3, 4]} // Responsive grid: 1 col on mobile, 4 cols on desktop
        spacing="20px"
        maxW="1200px"
        w="100%"
      >
        {images.map((image) => (
          <Box
            key={image.id}
            onClick={() => navigate(`/image/${image.id}`)}
            cursor="pointer"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
          >
            <Image
              src={image.urls.small}
              alt={image.alt_description}
              objectFit="cover"
              width="100%"
              height="250px" // Ensures consistent image size
            />
            <Box p={3} bg="white">
              <Text fontSize="md" fontWeight="bold" noOfLines={2}>
                {image.alt_description || "Untitled"}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {image.user.name}
              </Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default Gallery;
