//Screen basic whit a list of photos
import React, { useEffect, useState } from 'react';
import { Box, Spinner, Text, Image, Button, } from '@chakra-ui/react';

import { PhotosService, type PhotoDetail } from '@/services/photos.service';
import { useLocation } from 'react-router-dom';

const PhotoScreen: React.FC = () => {
    const [photoDetail, setPhotoDetail] = useState<PhotoDetail>();
    const [loading, setLoading] = useState<boolean>(true);

    const location = useLocation();
    const {photo} = location.state|| {} ;
    const {photo_base64} = photo || {};
    console.log('photo_path:',photo_base64);

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
            console.log('data:',data);
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

                   {photo_base64&&<Image
                                    src={`data:image/png;base64,${photo_base64}`}
                                    alt={`Photo 1`}
                        boxSize="200px"
                        objectFit="cover"
                    />}
                
                    <Text fontWeight='bold'>Fecha: </Text><Text >{photoDetail?.date}</Text>
                    <Text fontWeight='bold'>Hora: </Text><Text >{photoDetail?.time}</Text>
                    <Text fontWeight='bold'>Vehículo: </Text><Text>{photoDetail?.consultaVehiculo.TIPO} {photoDetail?.consultaVehiculo.MARCA} {photoDetail?.consultaVehiculo.LINEA} {photoDetail?.consultaVehiculo.MODELO} {photoDetail?.consultaVehiculo.COLOR} {photoDetail?.consultaVehiculo.USO} {photoDetail?.consultaVehiculo.PLACA} {photoDetail?.consultaVehiculo.CC}</Text>
                    <Text fontWeight='bold'>Distancia: </Text><Text>{photoDetail?.distance}</Text>
                    <Text fontWeight='bold'>Archivo: </Text><Text>{photoDetail?.fileName}</Text>
                    <Text fontWeight='bold'>Ubicación: </Text><Text>{photoDetail?.location}</Text>
                    <Text fontWeight='bold'>Límite de velocidad: </Text><Text >{photoDetail?.speedLimit}</Text>
                    <Text fontWeight='bold'>Número de video: </Text><Text>{photoDetail?.videoNumber}</Text>
                    <Text fontWeight='bold'>Número de serie: </Text><Text>{photoDetail?.serialNumber}</Text>
                    <Text fontWeight='bold'>Velocidad medida: </Text><Text>{photoDetail?.measuredSpeed}</Text>
                    <Button mt={4} color="white" variant='outline' bg='#5cb85c' onClick={() =>{}}>
                        Procesar
                    </Button>
                </Box>
            )}
        </Box>
    );
}
export default PhotoScreen;