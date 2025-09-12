//Screen basic whit a list of photos
import React, { useEffect, useState } from 'react';
import { Box, Spinner, Text, Image, Button, } from '@chakra-ui/react';

import { PhotosService, type PhotoDetail } from '@/services/photos.service';
import { useLocation, useNavigate } from 'react-router-dom';

const PhotoScreen: React.FC = () => {
    const [photoDetail, setPhotoDetail] = useState<PhotoDetail>();
    const [loading, setLoading] = useState<boolean>(true);
    const [date, setDate] = useState<string>("");
    const [time, setTime] = useState<string>("");
    const location = useLocation();
    const { photo } = location.state || {};
    const { photo_base64 } = photo || {};
    const navigate = useNavigate();

    const blockPhoto = async (id: string) => {
        try {
            await PhotosService.blockPhoto(id);

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
            const { timestamp } = data;
            const dateString = new Date(timestamp).toLocaleDateString();
            setDate(dateString);
            const timeString = new Date(timestamp).toLocaleTimeString();
            setTime(timeString);
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


    const processPhoto = async () => {
        try {
            setLoading(true);
            if (!photoDetail) return;
            const params = {
                cruise: photoDetail.location, 
                timestamp: new Date(photoDetail.timestamp),
                speed_limit_kmh: parseInt(photoDetail.speedLimit),
                current_speed_kmh: parseInt(photoDetail.measuredSpeed),
                lpNumber: photoDetail.consultaVehiculo.PLACA,
                lpType: photoDetail.consultaVehiculo.TIPO,
                photoId: photoDetail.id
            };
            const data = await PhotosService.processPhoto(params);
            console.log(data);
            if(data.status === "processed")
                navigate("/photos");
         
        } catch (error) {
            console.error("Error processing photo:", error);
        } finally {
            setLoading(false);
        }
    }




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

                    {photo_base64 && <Image
                        src={`data:image/png;base64,${photo_base64}`}
                        alt={`Photo 1`}
                        boxSize="600px"
                        objectFit="cover"
                    />}

                    <Text fontWeight='bold'>Fecha: </Text><Text >{date ?? '-'}</Text>
                    <Text fontWeight='bold'>Hora: </Text><Text >{time ?? '-'}</Text>
                    <Text fontWeight='bold'>Vehículo: </Text><Text>{photoDetail?.consultaVehiculo.TIPO} {photoDetail?.consultaVehiculo.MARCA} {photoDetail?.consultaVehiculo.LINEA} {photoDetail?.consultaVehiculo.MODELO} {photoDetail?.consultaVehiculo.COLOR} {photoDetail?.consultaVehiculo.USO} {photoDetail?.consultaVehiculo.PLACA} {photoDetail?.consultaVehiculo.CC}</Text>
                    <Text fontWeight='bold'>Ubicación: </Text><Text>{photoDetail?.location}</Text>
                    <Text fontWeight='bold'>Límite de velocidad: </Text><Text >{photoDetail?.speedLimit}</Text>
                    <Text fontWeight='bold'>Velocidad medida: </Text><Text>{photoDetail?.measuredSpeed}</Text>
                    <Button mt={4} color="white" variant='outline' bg='#5cb85c' onClick={processPhoto}>
                        Procesar
                    </Button>
                </Box>
            )}
        </Box>
    );
}
export default PhotoScreen;