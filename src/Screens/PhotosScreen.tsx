//Screen basic whit a list of photos
import React, { useEffect, useState } from 'react';
import { Box, Grid, Image, Spinner, Text } from '@chakra-ui/react';

type Photo = {
    image: string;
    date: Date;
    status: number;
};

const PhotosScreen: React.FC = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setPhotos([{ image: 'https://www.shutterstock.com/image-photo/cruz-das-alma-bahia-brazil-260nw-2335032803.jpg', date: new Date(), status: 1 }]);
            setLoading(false);
        }
            , 500);
    }
        , []);
    return (
        <Box p={4} backgroundColor="white" minH="100vh">
            <Text fontSize="2xl" mb={4} fontWeight="bold">
                Photos
            </Text>
            {loading ? (
                <Spinner size="xl" />
            ) : (
                <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
                    {photos.map((photo, index) => (
                        <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden">
                            <Image src={photo.image} alt={`Photo ${index + 1}`} boxSize="200px" objectFit="cover" />
                            <Box p={4}>
                                <Text fontSize="sm" color="gray.500">
                                    {photo.date.toDateString()}
                                </Text>
                                <Text>Status: {photo.status}</Text>
                            </Box>
                        </Box>
                    ))}
                </Grid>
            )}
        </Box>
    );
}
export default PhotosScreen;