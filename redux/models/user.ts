export interface UserResponse {
    userId: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    description: string;
    profilePicture: number[] | null;
    friends: string[];
    followers: string[];
    following: string[];
}

export interface UserBasicDataResponse {
    userId: string;
    username: string;
    profilePicture: number[] | null;
}
