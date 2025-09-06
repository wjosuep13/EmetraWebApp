import api from "../api/api";

export interface Vehicle {
    id: number;
    Vehicle_name: string;
}

export const VehicleService = {
    get: async (): Promise<Vehicle[]> => {
         const { data } =  await api.get("/Vehicle");
        return data;
    },

};
