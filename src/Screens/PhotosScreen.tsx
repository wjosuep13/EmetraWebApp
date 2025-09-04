//Screen basic whit a list of photos
import React, { useEffect, useState } from 'react';
import { Box, Grid, Image, Spinner, Text, Select, createListCollection, Portal, Input, Field } from '@chakra-ui/react';
import { CruiseService } from '@/services/cruise.service';
import { PhotosService, type Photo } from '@/services/photos.service';


const PhotosScreen: React.FC = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [cruiseCollection, setCruiseCollection] = useState();
    const [selectedCruise, setSelectedCruise] = useState<string>("")
    const [date, setDate] = useState<Date>(new Date());
    const [loading, setLoading] = useState<boolean>(true);

    const formatDateForInput = (d: Date) => {
        const year = d.getFullYear()
        const month = String(d.getMonth() + 1).padStart(2, "0")
        const day = String(d.getDate()).padStart(2, "0")
        return `${year}-${month}-${day}`
    }


    const fetchPhotos = async (cruise_id: number, date: Date, page: number) => {
        try {
            const data = await PhotosService.getAll(cruise_id, date, page);
            setPhotos(data);
        } catch (error) {
            console.error("Error fetching photos:", error);
        } finally {
            setLoading(false);
        }
    }


    const fetchCruises = async () => {
        try {
            setLoading(true);
            const cruises = await CruiseService.get();
            console.log("Fetched cruises:", cruises);
            const cruiseItems = cruises.map((cruise) => ({
                label: cruise.cruise_name,
                value: cruise.id,
            }));
            const cruiseCollection = createListCollection({
                items: cruiseItems,
            });
            setCruiseCollection(cruiseCollection);
        } catch (error) {
            console.error("Error fetching cruises:", error);
        } finally {
            setLoading(false);
        }
    }



    useEffect(() => {
        fetchCruises();
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
                <>
                    <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" w="100%">
                        <Select.Root
                            collection={cruiseCollection}
                            size="sm"
                            width="320px"
                            color='black'
                            multiple={false}
                            value={selectedCruise ? [selectedCruise] : []}
                            onValueChange={(e) => {
                                const [val] = e.value
                                setSelectedCruise(val)
                            }}
                        >
                            <Select.HiddenSelect />
                            <Select.Label>Crucero</Select.Label>
                            <Select.Control>
                                <Select.Trigger>
                                    <Select.ValueText placeholder="Selecciona un crucero" />
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                    <Select.Indicator />
                                </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                                <Select.Positioner>
                                    <Select.Content>
                                        {cruiseCollection.items.map((cruise) => (
                                            <Select.Item item={cruise} key={cruise.value}>
                                                {cruise.label}
                                                <Select.ItemIndicator />
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Positioner>
                            </Portal>
                        </Select.Root>

                        <Field.Root >
                            <Field.Label>Fecha</Field.Label>
                            <Input placeholder="Fecha"  type='date' color='black' maxLength={8}/>
                        </Field.Root>
                    </Box>

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
                </>
            )}
        </Box>
    );
}
export default PhotosScreen;