import { body } from "express-validator";
import { AvailableResolutions } from "../types/types";



const validResolutions = Object.values(AvailableResolutions);



export const videoTitleBodyFieldValidationMiddleware = body('title')
    .exists({checkFalsy: true}).withMessage('title field is required')
    .bail()
    .trim()
    .notEmpty().withMessage('title field is required')
    .isLength({min:1, max:40 }).withMessage('title should be between 1 and 30 symbols');

export const videoAuthorBodyFieldValidationMiddleware = body('author')
    .exists().withMessage('author field is required')
    .trim()
    .notEmpty().withMessage('author field is required')
    .isLength({min:1, max:20 }).withMessage('Title should be between 1 and 20 symbols');

export const videoAvailableResolutionsBodyFieldValidationMiddleware = body('availableResolutions')
    .optional({ nullable: true })
    .isArray().withMessage('availableResolutions must be an array')
    .custom((value) => {
        if (value && value.some((res: AvailableResolutions) => !validResolutions.includes(res))) {
            throw new Error(`Invalid resolution provided. Allowed values: ${validResolutions.join(', ')}`);
        }
        return true;
    })

export const videoCanBeDownloadedBodyFieldValidationMiddleware = body('canBeDownloaded')
    .optional({ nullable: true })
    .isBoolean().withMessage('canBeDownloaded must be a boolean')

export const videoMinAgeRestrictionBodyFieldValidationMiddleware = body('minAgeRestriction')
    .optional({ nullable: true })
    .isNumeric().withMessage('minAgeRestriction must be a number')
    .custom((value) => {
        if (value < 1 || value > 18) {
            throw new Error('minAgeRestriction must be between 1 and 18');
        }
        return true;
    });

export const videoPublicationDateBodyFieldValidationMiddleware = body('publicationDate')
    .optional({ nullable: true })
    .isString().withMessage('publicationDate must be an ISO date')
    .bail()
    .isISO8601().withMessage('publicationDate must be an ISO date')
