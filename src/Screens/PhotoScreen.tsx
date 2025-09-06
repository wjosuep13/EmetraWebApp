//Screen basic whit a list of photos
import React, { useEffect, useState } from 'react';
import { Box, Spinner, Text, Image, } from '@chakra-ui/react';

import { PhotosService, type PhotoDetail } from '@/services/photos.service';
import { useLocation } from 'react-router-dom';

const PhotoScreen: React.FC = () => {
    const [photoDetail, setPhotoDetail] = useState<PhotoDetail>();
    const [loading, setLoading] = useState<boolean>(true);

    const location = useLocation();
    const {photo} = location.state|| {} ;
    const {photo_path} = photo || {};
    console.log('photo_path:',photo_path);

    const blockPhoto = async (id: string) => {
        try {
            //TODO: uncoment this when finish testing-> await PhotosService.blockPhoto(id);

        } catch (error) {
            console.error("Error fetching photos:", error);
        } finally {
            setLoading(false);
        }
    }

    const fetchPhoto = async (id: string) => {
        try {
            setLoading(true);
            const data = await PhotosService.getById(id);
            console.log(data);
            setPhotoDetail(data);
        } catch (error) {
            console.error("Error fetching photo:", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (photo.id) {
            blockPhoto(photo.id);
            fetchPhoto(photo.id);
        }
    }, [photo]);




    return (
        <Box p={4} backgroundColor="white" minH="100vh" color="black"
        >
            <Text fontSize="2xl" mb={4} fontWeight="bold">
                Foto
            </Text>
            {loading ? (
                <Spinner size="xl" />
            ) : (
                <Box
                    color="black"
                >

                   {photo_path&&<Image
                        src={photo_path}
                        alt={`Photo 1`}
                        boxSize="200px"
                        objectFit="cover"
                    />}
                
                    <Text fontWeight='bold'>Fecha: </Text><Text >{photoDetail?.date}</Text>
                    <Text fontWeight='bold'>Hora: </Text><Text >{photoDetail?.time}</Text>
                    <Text fontWeight='bold'>Vehículo: </Text><Text>{photoDetail?.vehicle.type} {photoDetail?.vehicle.brand} {photoDetail?.vehicle.color} {photoDetail?.vehicle.plate}</Text>
                    <Text fontWeight='bold'>Distancia: </Text><Text>{photoDetail?.distance}</Text>
                    <Text fontWeight='bold'>Archivo: </Text><Text>{photoDetail?.fileName}</Text>
                    <Text fontWeight='bold'>Ubicación: </Text><Text>{photoDetail?.location}</Text>
                    <Text fontWeight='bold'>Límite de velocidad: </Text><Text >{photoDetail?.speedLimit}</Text>
                    <Text fontWeight='bold'>Número de video: </Text><Text>{photoDetail?.videoNumber}</Text>
                    <Text fontWeight='bold'>Número de serie: </Text><Text>{photoDetail?.serialNumber}</Text>
                    <Text fontWeight='bold'>Velocidad medida: </Text><Text>{photoDetail?.measuredSpeed}</Text>
                </Box>
            )}
        </Box>
    );
}
export default PhotoScreen;