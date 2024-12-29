import { AddVideoRequestRequiredData, UpdateVideoRequiredRequestData, VideoDBType } from "../types/types";
import { videoService } from "../domain/videoService";


export const videoRepository = {
    getAllVideos: async (): Promise<VideoDBType[]> => {
        return await videoService.getAllVideos();
    },

    getVideoById: async (id: number): Promise<VideoDBType | null> => {
        const videoById =await videoService.getVideoById(id);
        return videoById || null;
    },

    addVideo: async ({ title, author, availableResolutions }: AddVideoRequestRequiredData): Promise<VideoDBType> => {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        const newVideoData: VideoDBType = {
            id: +Date.now(),
            canBeDownloaded: false,
            createdAt: today.toISOString(),
            minAgeRestriction: null,
            publicationDate: tomorrow.toISOString(),
            title,
            author,
            availableResolutions,
        };

        await videoService.addVideo(newVideoData)
        return newVideoData;
    },

    updateVideo: async (id: number, videoDataForUpdate: UpdateVideoRequiredRequestData): Promise<boolean> => {
        const videoById = await videoService.getVideoById(id);
        if (!videoById) {
            return false;
        }
        await videoService.updateVideo(id,videoDataForUpdate)
        return true;
    },

    deleteVideo: async (id: number): Promise<boolean> => {
        const videoById = await videoRepository.getVideoById(id);
        if (!videoById) {
            return false;
        }
        await videoService.deleteVideo(id)
        return true;
    },
};