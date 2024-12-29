import { db, setDB } from "../../db/db";
import { UpdateVideoRequiredRequestData, VideoDBType } from "../types/types";


export const videoService = {
    getAllVideos: async (): Promise<VideoDBType[]> => {
        return db.videos;
    },

    getVideoById: async (id: number): Promise<VideoDBType | null> => {
        const videoById = db.videos.find(video => video.id === id);
        return videoById || null;
    },

    addVideo: async (newVideoData: VideoDBType): Promise<VideoDBType> => {
        setDB({ videos: [...db.videos, newVideoData] });
        return newVideoData;
    },

    updateVideo: async (id:number, videoDataForUpdate: UpdateVideoRequiredRequestData): Promise<boolean> => {
        const newVideosCollection = db.videos.map(video =>
            video.id === id ? { ...video, ...videoDataForUpdate } : video
        );
        setDB({ videos: newVideosCollection });
        return true;
    },

    deleteVideo: async (id: number): Promise<boolean> => {
        const newArr = db.videos.filter(video => video.id !== id);
        setDB({ videos: newArr });
        return true;
    },
};