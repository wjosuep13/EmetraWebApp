import api from "../api/api";

export interface Photo {
  id: string;
  image: string;
  date: Date;
  status:number;
}

export const PhotosService = {
  getAll: async (cruise_id:number,date:Date,page:number): Promise<Photo[]> => {
    const params=`photo_date=${date}&id_cruise=${cruise_id}&page=${page}&limit=10`;
    const { data } = await api.get(`/photos?${params}`);
    return data;
  },

  updateStatus: async (id: string, status: string) => {
    const { data } = await api.patch(`/photos/${id}`, { status });
    return data;
  },
};
