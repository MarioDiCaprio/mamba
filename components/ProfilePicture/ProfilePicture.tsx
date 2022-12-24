import React, {ImgHTMLAttributes} from "react";


interface ProfilePictureProps {
    bytes: number[] | null;
    imgProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>;
}


const ProfilePicture: React.FC<ProfilePictureProps> = ({ bytes, imgProps }) => {
    if (!bytes) {
        return <img src="/user/user.png" {...imgProps}  alt="" />;
    }
    const base64 = Buffer.from(bytes).toString('base64');
    return <img src={`data:image/png;base64, ${base64}`} {...imgProps} alt="" />;
}


export default ProfilePicture;
