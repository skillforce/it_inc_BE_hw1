// import {VideoDBType} from '../src/db/video-db-type'
// import {Resolutions} from '../src/input-output-types/video-types'
import {DBType} from '../src/db/db'
import { AvailableResolutions } from "../src/videos/types/types";

// готовые данные для переиспользования в тестах


export const video1: any /*VideoDBType*/ = {
    id: 1,
    title: 't' + Date.now() + Math.random(),
    author: 'a' + Date.now() + Math.random(),
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date().toISOString(),
    availableResolution: [AvailableResolutions.P240],
}

// ...

export const dataset1: DBType = {
    videos: [video1],
}

// ...