import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, ModalOverlay, ModalContent, ModalBody, Box, Button, Grid, Image, Text } from "@chakra-ui/react";
import CommentSection from "./CommentSection";

interface Image {
  id: string;
  urls: { small: string };
  alt_description: string;
  user: { name: string };
}


const Gallery = () => {
    const [images, setImages] = useState<Image[]>([]);
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);

    useEffect(() => {
        axios.get("http://localhost:4000/api/images").then((res) => setImages(res.data));
    }, []);

    return (
        <div>
            <Modal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)}>
            <ModalOverlay bg="blackAlpha.800" />
            <ModalContent maxW="lg" p={6}>
                <ModalBody>
                {selectedImage && (
                    <>
                    <Image
                        src={selectedImage.urls.small}
                        alt={selectedImage.alt_description}
                        w="full"
                    />
                    <Text>{selectedImage.user.name}</Text>
                    <CommentSection imageId={selectedImage.id} />
                    <Button onClick={() => setSelectedImage(null)} mt={4}>
                        Close
                    </Button>
                    </>
                )}
                </ModalBody>
            </ModalContent>
            </Modal>

            <Grid
            templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }}
            gap={4}
            >
            {images.map((image) => (
                <Box key={image.id} onClick={() => setSelectedImage(image)} cursor="pointer">
                <Image src={image.urls.small} alt={image.alt_description} />
                </Box>
            ))}
            </Grid>
        </div>
    );
};

export default Gallery;