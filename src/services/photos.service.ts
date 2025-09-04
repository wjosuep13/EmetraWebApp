import api from "../api/api";

export interface Photo {
  id: string;
  photo_path: string;
  photo_date: string;
  status:number;
}

export const PhotosService = {
  getAll: async (cruise_id:number,date:string,page:number): Promise<Photo[]> => {
    const params=`photo_date=${date}&id_cruise=${cruise_id}&page=${page}&limit=10`;
    const { data } = await api.get(`/photos?${params}`);
    return data[0];
  },

  updateStatus: async (id: string, status: string) => {
    const { data } = await api.patch(`/photos/${id}`, { status });
    return data;
  },
};
