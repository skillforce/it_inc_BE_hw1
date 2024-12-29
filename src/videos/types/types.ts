export interface VideoDBType {
    id: number
    title: string
    author: string
    availableResolutions: AvailableResolutions[]
    createdAt:string
    canBeDownloaded: boolean
    minAgeRestriction: number | null
    publicationDate: string
}

export enum AvailableResolutions {
    P144 = 'P144',
    P240 = 'P240',
    P360 = 'P360',
    P480 = 'P480',
    P720 = 'P720',
    P1080 = 'P1080',
    P1440 = 'P1440',
    P2160 = 'P2160',
}

export interface AddVideoRequestRequiredData {
    title: string
    author: string
    availableResolutions: AvailableResolutions[]
}

export interface UpdateVideoRequiredRequestData
       extends Partial<Omit<VideoDBType,'title' & 'author'>>{
    title: string
    author: string
}