import api from "../api/api";

export interface Cruise {
    id: number;
    cruise_name: string;
}

export const CruiseService = {
    get: async (): Promise<Cruise[]> => {
         const { data } =  await api.get("/cruise");
        //{
        //     data: [
        //         {
        //             id: "1",
        //             name: "Periferico"
        //         },
        //         {
        //             id: "2",
        //             name: "Roosevelt"
        //         },
        //         {
        //             id: "3",
        //             name: "Chinautla"
        //         }
        //     ]
        // }
       
        return data;
    },

};
