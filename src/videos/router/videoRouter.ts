import { Request, Response, Router } from 'express'
import { videoRepository } from "../repository/videoRepository";
import { AddVideoRequestRequiredData, UpdateVideoRequiredRequestData, VideoDBType } from "../types/types";
import {
    inputValidationMiddleware,
    validateUnexpectedFields,
    validateUrlParamId
} from "../../middlewares/inputValudationMiddleware";
import {
    videoAuthorBodyFieldValidationMiddleware,
    videoAvailableResolutionsBodyFieldValidationMiddleware,
    videoCanBeDownloadedBodyFieldValidationMiddleware,
    videoMinAgeRestrictionBodyFieldValidationMiddleware, videoPublicationDateBodyFieldValidationMiddleware,
    videoTitleBodyFieldValidationMiddleware
} from "../middlewares/videoInputValidationMiddleware";

export const videoRouter = Router({});


videoRouter.get('/', async (req: Request, res: Response<VideoDBType[]>) => {
    const responseData = await videoRepository.getAllVideos()
    res.status(200).json(responseData);

})

videoRouter.get('/:id',
    validateUrlParamId,
    async (req: Request<{ id: string }>, res: Response<VideoDBType>) => {
        const responseData = await videoRepository.getVideoById(+req.params.id)
        if (responseData) {
            res.status(200).json(responseData)
            return;
        }
        res.sendStatus(404)

    })


type PostAllowedKeys = keyof AddVideoRequestRequiredData

const postVideoAllowedKeys: PostAllowedKeys[] = ['title', 'author', 'availableResolutions']

videoRouter.post('/',
    validateUnexpectedFields(postVideoAllowedKeys),
    videoTitleBodyFieldValidationMiddleware,
    videoAuthorBodyFieldValidationMiddleware,
    videoAvailableResolutionsBodyFieldValidationMiddleware,
    inputValidationMiddleware,
    async (req: Request<any, AddVideoRequestRequiredData>, res: Response<VideoDBType>) => {
        const {title, author, availableResolutions} = req.body
        const newVideo = await videoRepository.addVideo({title, author, availableResolutions})
        res.status(201).json(newVideo)
    })

type UpdateVideoAllowedKeys = keyof UpdateVideoRequiredRequestData

const updateVideoAllowedKeys:UpdateVideoAllowedKeys[] =
    ['title', 'author', 'availableResolutions','canBeDownloaded', 'minAgeRestriction', 'publicationDate']


videoRouter.put('/:id',
    validateUrlParamId,
    validateUnexpectedFields(updateVideoAllowedKeys),
    videoTitleBodyFieldValidationMiddleware,
    videoAuthorBodyFieldValidationMiddleware,
    videoAvailableResolutionsBodyFieldValidationMiddleware,
    videoCanBeDownloadedBodyFieldValidationMiddleware,
    videoMinAgeRestrictionBodyFieldValidationMiddleware,
    videoPublicationDateBodyFieldValidationMiddleware,
    inputValidationMiddleware,
    async (req: Request<{ id: string }, UpdateVideoRequiredRequestData>, res: Response<any>) => {
        const queryIdForUpdate = req.params.id;
        const newDataForVideoToUpdate = req.body;

        const isUpdatedVideo = await videoRepository.updateVideo(+queryIdForUpdate, newDataForVideoToUpdate)
        if (!isUpdatedVideo) {
            res.sendStatus(404)
            return;
        }
        res.sendStatus(204)


    })

videoRouter.delete('/:id',
    validateUrlParamId,
    async (req: Request<{ id: string }>, res: Response<any>) => {

    const queryId = req.params.id
    const videos = await videoRepository.deleteVideo(+queryId)
    if (!videos) {
        res.sendStatus(404)
        return;
    }
    res.sendStatus(204)
})
