import api from "../api/api";

export interface Photo {
  id: string;
  image: string;
  date: string;
  status: string;
}

export const PhotosService = {
  getAll: async (): Promise<Photo[]> => {
    const { data } = await api.get("/photos");
    return data;
  },

  updateStatus: async (id: string, status: string) => {
    const { data } = await api.patch(`/photos/${id}`, { status });
    return data;
  },
};
