import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Image, Text } from "@chakra-ui/react";

interface Image {
  id: string;
  urls: { small: string };
  alt_description: string;
  user: { name: string };
}


const Gallery = () => {
    const [images, setImages] = useState<Image[]>([]);

    useEffect(() => {
        axios.get("http://localhost:4000/api/images").then((res) => setImages(res.data));
    }, []);

    return (
        <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }} gap={4} p={4}>
            {images.map((image) => (
                <Box key={image.id} borderWidth="1px" borderRadius="lg" p={2} shadow="md">
                    <Image src={image.urls.small} alt={image.alt_description} w="full" h={40} objectFit="cover" />
                    <Text fontSize="sm" color="gray.600">
                        {image.user.name}
                    </Text>
                </Box>
            ))}

        </Grid>
    );
};

export default Gallery;