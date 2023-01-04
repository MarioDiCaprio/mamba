import styles from "../styles/Index.module.sass";
import {NextPage} from "next";
import React from "react";
import {FaUserFriends as CommunityIcon} from "react-icons/fa";
import {MdPhotoCamera as CameraIcon} from "react-icons/md";
import {FaPaintBrush as BrushIcon} from "react-icons/fa";
import Link from "next/link";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useLoginMutation} from "../redux/api/mambaApi";
import {useRouter} from "next/router";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import Head from "next/head";


export const Navbar: React.FC = () => {
    return (
        <div className={styles.navbar}>

        </div>
    );
}


const Index: NextPage = () => {
    const [login, { isLoading }] = useLoginMutation();

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required')
        }),
        onSubmit: (values) => {
            // server is now loading
            // extract values from form
            const username = (values.username === '')? null : values.username;
            const password = (values.username === '')? null : values.password;
            // make login request (and remember login)
            login({ username, password })
                .unwrap()
                .then(() => {
                    router.push("/activity");
                }).catch(error => {
                    switch (error.status) {
                        case 401:
                            formik.setErrors({ password: "Username or password invalid" });
                            break;
                        case 404:
                            formik.setErrors({ password: "Failed to connect to server" });
                            break;
                        case 500:
                            formik.setErrors({ password: "Internal server error occurred" });
                            break;
                        default:
                            formik.setErrors({ password: "An unknown error occurred" });
                            break;
                    }
            });
        }
    });

    return (
        <div className={styles.context}>

            <Head>
                <title>Mamba | Home</title>
            </Head>

            <LoadingScreen open={isLoading} />

            <Navbar />

            <div className={styles.main}>

                <div className={styles.panelContainer}>

                    <div className={styles.leftPanel}>
                        <h1>Join the club</h1>
                        <p>
                            Share your thoughts on photography with thousands
                            of users worldwide!
                        </p>

                        <div className={styles.topic}>
                            <div className={styles.topicIcon}>
                                <CommunityIcon />
                            </div>
                            <div className={styles.topicText}>
                                <h1>Community</h1>
                                <p>Connect with like-minded people</p>
                            </div>
                        </div>

                        <div className={styles.topic}>
                            <div className={styles.topicIcon}>
                                <CameraIcon />
                            </div>
                            <div className={styles.topicText}>
                                <h1>Photography</h1>
                                <p>Show off your skills</p>
                            </div>
                        </div>

                        <div className={styles.topic}>
                            <div className={styles.topicIcon}>
                                <BrushIcon />
                            </div>
                            <div className={styles.topicText}>
                                <h1>Art</h1>
                                <p>Explore art around the world</p>
                            </div>
                        </div>

                    </div>

                    <div className={styles.rightPanel}>
                        <h1>Welcome</h1>
                        <form onSubmit={formik.handleSubmit}>

                            <input
                                className={styles.input}
                                autoComplete="new-password"
                                placeholder="Username"
                                id="username"
                                name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                data-test="username"
                            />

                            <span className={styles.inputError}>
                                { formik.touched.username && formik.errors.username }
                            </span>

                            <input
                                className={styles.input}
                                autoComplete="new-password"
                                type="password"
                                placeholder="Password"
                                id="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                data-test="password"
                            />

                            <span className={styles.inputError}>
                                { formik.touched.password && formik.errors.password }
                            </span>

                            <button className={styles.loginButton} type="submit">
                                Login
                            </button>
                        </form>
                        <p className={styles.signupSection}>
                            Not a member? <Link href="/signup">Sign up</Link>
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}


export default Index;
