import {MediaResponse} from "./media";


export interface PostResponse {
    postId: string;
    title: string | null;
    description: string | null;
    dateCreated: string;
    dateUpdated: string;
    media: MediaResponse;
    owner: string;
    likes: string[];
}

export interface PostCreationRequest {
    title: string | null;
    description: string | null;
    media: null | {
        data: number[];
        type: string;
    };
    username: string | null;
}

export interface LikeRequest {
    userId: string;
    postId: string;
    like: boolean;
}
