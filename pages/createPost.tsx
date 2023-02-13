import styles from "../styles/CreatePost.module.sass";
import $ from 'jquery';
import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useFormik } from "formik";
import * as yup from 'yup';
import useMedia from "../hooks/useMedia";
import useClient from "../hooks/useClient";
import { useRouter } from "next/router";
import LoadingScreen from '../components/LoadingScreen/LoadingScreen';
import {usePostCreateMutation} from "../redux/api/mambaApi";
import {PostCreationRequest} from "../redux/models/post";
import {Navbar} from "./index";


const CreatePost: NextPage = () => {
    const { data: client } = useClient();
    const [createPost, { isLoading }] = usePostCreateMutation();
    const router = useRouter();
    const [MediaChooser, media] = useMedia();
    const [tab, setTab] = useState<0 | 1>(0);

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            media: ''
        },
        validationSchema: yup.object({
            title: yup.string().optional(),
            description: yup.string().optional()
        }),
        onSubmit: ({ title, description }) => {
            if (!media) {
                $('#mediaTabButton').trigger('click');
                formik.setFieldError('media', 'Please select a media to share!');
                return;
            }
            getMediaAsByteArray().then(mediaAsByteArray => {
                const request: PostCreationRequest = {
                    title,
                    description,
                    media: {
                        data: mediaAsByteArray,
                        type: media.type
                    },
                    username: client?.username ?? null
                };
                createPost(request)
                    .unwrap()
                    .then(() => {
                        router.push('/')
                    })
                    .catch(error => {
                        console.log(error)
                        switch (error.status) {
                            case 404:
                                alert('Error: Account nonexistent');
                                break;
                            case 500:
                                alert('Internal server error occurred');
                                break;
                            default:
                                alert('Unknown error occurred');
                                break;
                        }
                    });
            });

        }
    });

    const mediaTabClasses = [styles.tab];
    const mediaTabButtonClasses = [styles.tabButton];
    if (tab === 0) {
        mediaTabClasses.push(styles.tabActive);
        mediaTabButtonClasses.push(styles.tabButtonActive);
    }

    const textTabClasses = [styles.tab];
    const textTabButtonClasses = [styles.tabButton];
    if (tab === 1) {
        textTabClasses.push(styles.tabActive);
        textTabButtonClasses.push(styles.tabButtonActive);
    }

    async function getMediaAsByteArray(): Promise<number[]> {
        if (!media) {
            return [];
        }
        const buffer = await media.arrayBuffer();
        const unit8 = new Uint8Array(buffer);
        return Array.from(unit8);
    }

    return (
        <div className={styles.context}>
            <Head>
                <title>Mamba | Create Post</title>
            </Head>

            <LoadingScreen open={isLoading} />

            <Navbar />

            {/* Container for the actual content */}
            <div className={styles.container}>

                {/* Header */}
                <h2 className={styles.header}>
                    Create A Post
                </h2>

                {/* Tab Buttons */}
                <menu className={styles.tabButtons}>
                    {/* Media Tab Button */}
                    <button id="mediaTabButton" className={mediaTabButtonClasses.join(' ')} onClick={() => setTab(0)}>
                        Media
                    </button>
                    {/* Text Tab Button */}
                    <button id="textTabButton" className={textTabButtonClasses.join(' ')} onClick={() => setTab(1)}>
                        Text
                    </button>
                </menu>

                <form className={styles.form} onSubmit={formik.handleSubmit}>
                    {/* Media Tab */}
                    <div className={mediaTabClasses.join(' ')}>
                        <div className={styles.mediaChooserWrapper}>
                            {MediaChooser}
                            <div className={styles.errorMessage}>
                                {formik.errors.media}
                            </div>
                        </div>
                    </div>

                    {/* Text Tab */}
                    <div className={textTabClasses.join(' ')}>
                        <div className={styles.textTabWrapper}>
                            {/* Title Input */}
                            <input
                                className={styles.titleInput}
                                placeholder="Title..."
                                spellCheck="false"
                                id="title"
                                name="title"
                                onChange={formik.handleChange}
                            />
                            {/* Text Input */}
                            <textarea
                                className={styles.textInput}
                                placeholder="Text..."
                                spellCheck="false"
                                id="text"
                                name="text"
                                onChange={formik.handleChange}
                            />
                            {/* Submit Button */}
                            <button className={styles.submitButton} type="submit">
                                Submit
                            </button>
                        </div>

                    </div>
                </form>

            </div>

        </div>
    );
}

export default CreatePost;
