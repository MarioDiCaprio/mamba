import React from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import Link from "next/link";
import { AiOutlineUser as UserIcon } from 'react-icons/ai';
import { RiKey2Line as KeyIcon } from 'react-icons/ri';
import styles from "./LoginPanel.module.scss";
import { useRouter } from "next/router";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";
import { useLoginMutation } from "../../../redux/api/mambaApi";


/**
 * This is the login panel for the `Base`'s sidebar, which is
 * rendered when the user is not logged in. It contains a login
 * form with a username and a password. Logins are automatically
 * saved as cookies with this form.
 * @returns The login panel
 */
const LoginPanel: React.FC = () => {
    /** Used to make a login request to the server */
    const [login, { isLoading }] = useLoginMutation();

    /** Used to reload page if login was successful */
    const router = useRouter();

    /** Formik object. */
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
                    router.reload();
                }).catch(_error => {
                    // TODO handle HTTP errors
                    // if server error occurred: stop loading and show error message
                    formik.setErrors({ username: "Failed to connect to server" });
                });
        }
    });

    return (
        <div className={styles.loginPanel}>

            { /** Show loading screen if server is loading */ }
            <LoadingScreen open={isLoading} />

            {/* Header */}
            <h3 className={styles.loginPanelHeader}>
                Login Now
            </h3>

            {/* Form */}
            <form className={styles.loginForm} onSubmit={formik.handleSubmit}>

                {/* Username */}
                <div className={styles.inputWrapper}>
                    <UserIcon />
                    <input
                        autoComplete="new-password"
                        placeholder="Username"
                        className={styles.input}
                        id="username"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        data-test="username"
                    />
                </div>

                {/* Password */}
                <div className={styles.inputWrapper}>
                    <KeyIcon />
                    <input
                        autoComplete="new-password"
                        type="password"
                        placeholder="Password"
                        className={styles.input}
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        data-test="password"
                    />
                </div>

                {/* Login Validity */}
                <div className={styles.loginValidity}>
                        <span>
                            { formik.touched.username && formik.errors.username }
                        </span>
                    <span>
                            { formik.touched.password && formik.errors.password }
                        </span>
                </div>

                {/** Horizontal separator */}
                <hr className={styles.hr}></hr>

                {/* Login Button */}
                <button className={styles.loginButton} data-test="login">
                    Login
                </button>

                {/* Registration Link */}
                <Link href="/register">
                        <span className={styles.signupLink}>
                            Sign up instead
                        </span>
                </Link>
            </form>
        </div>
    );
}

export default LoginPanel;
