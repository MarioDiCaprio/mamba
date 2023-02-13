import styles from "./useMedia.module.sass";
import $ from 'jquery';
import React, { useState } from "react";
import { MediaResponse } from "../redux/models/media";


export const ImageViewer: React.FC<{ src?: string }> = ({ src }) => {
    return (
        <div className={styles.imageWrapper}>
            <img className={styles.image} src={src} alt="" />
        </div>
    );
}

//////////////////////////////////////////////////////////////////

export const Media: React.FC<{ src?: string | MediaResponse }> = ({ src }) => {
    if (!src) return <></>;

    if (typeof src === 'string') {
        return (
            <div className={styles.viewer}>
                <ImageViewer src={src} />
            </div>
        )
    }

    const url = `data:${src.type};base64,${src.data}`;

    if (src.type.startsWith('image'))
        return <ImageViewer src={url} />
    else
        return <></>;
}

//////////////////////////////////////////////////////////////////

export const MediaChooser: React.FC<{ onChange?: (file: File) => void }> = (props) => {
    const [src, setSrc] = useState<string | undefined>();

    const Preview: React.FC = () => {
        if (!src) {
            return <div className={styles.decoBox} onClick={handleButtonClick} />
        }
        return <img className={styles.chooserImage} src={src} onClick={handleButtonClick} alt="" />
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files === null) return;
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setSrc(url);
        if(props.onChange) props.onChange(file);
    }

    function handleButtonClick() {
        $(`.${styles.chooserInput}`).trigger('click');
    }

    return (
        <div className={styles.chooser}>
            <Preview />
            <button className={styles.chooserButton} onClick={handleButtonClick}>
                <input className={styles.chooserInput} type="file" role="button" accept="image/*, video/*" onChange={handleChange} />
                Select Media
            </button>
        </div>
    );
}

//////////////////////////////////////////////////////////////////

type UseMediaReturnType = [JSX.Element, File?];

export default function useMedia(): UseMediaReturnType {
    const [file, setFile] = useState<File>();
    return [<MediaChooser onChange={setFile} />, file]
}
