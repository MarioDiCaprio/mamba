export interface UserResponse {
    userId: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    description: string;
    profilePicture: string | null;
    friends: string[];
    followers: string[];
    following: string[];
    posts: string[];
    likes: string[];
}

export interface UserBasicDataResponse {
    userId: string;
    username: string;
    profilePicture: string | null;
}
