import styles from "../styles/Signup.module.sass";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useRouter } from "next/router";
import { Navbar } from "./index";
import { AiOutlineUser as UserIcon } from 'react-icons/ai';
import { MdAlternateEmail as EmailIcon } from 'react-icons/md';
import { RiKey2Line as KeyIcon } from 'react-icons/ri';
import SplashCheckbox from '../components/checkboxes/SplashCheckbox/SplashCheckbox';
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import {useSignupMutation} from "../redux/api/mambaApi";


const Signup: NextPage = () => {
    const router = useRouter();

    const [signup, { isLoading }] = useSignupMutation();

    const formik = useFormik({
        initialValues: {
            username: undefined,
            email: undefined,
            password: undefined,
            termsAndServices: 0
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            email: Yup.string().email('Enter a valid email address').required('Email is required'),
            password: Yup.string().min(5, 'Password must be at least 5 characters long').required('Password is required'),
            termsAndServices: Yup.number().oneOf([1], 'Terms and Services must be accepted')
        }),
        onSubmit: (values) => {
            const username = (!values.username)? null : values.username;
            const email = (!values.email)? null : values.email;
            const password = (!values.password)? null : values.password;

            signup({ username, email, password })
                .unwrap()
                .then(() => {
                    router.push('/');
                }).catch(error => {
                    switch (error.status) {
                        case 401:
                            formik.setErrors({ username: 'Username already exists' });
                            break;
                        case 404:
                            formik.setErrors({ username: 'Failed to connect to server' });
                            break;
                    }
                });
        }
    });

    return (
        <div className={styles.context}>

            <Head>
                <title>Mamba | Sign Up</title>
            </Head>

            <LoadingScreen open={isLoading} />

            <Navbar />

            <div className={styles.container}>
                {/* Form + Header */}
                <div className={styles.formAndHeader}>

                    {/* Header */}
                    <h2 className={styles.header}>
                        Sign Up
                    </h2>

                    {/* Description */}
                    <p className={styles.description}>
                        Join a large community and share your artistic self with like-minded
                        people
                    </p>

                    {/* Form */}
                    <form className={styles.form} onSubmit={formik.handleSubmit} data-test="registerForm">

                        {/* Input Group */}
                        <div className={styles.inputGroup}>

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
                                    data-test="registerUsername"
                                />
                            </div>

                            {/* Email */}
                            <div className={styles.inputWrapper}>
                                <EmailIcon />
                                <input
                                    autoComplete="new-password"
                                    type="email"
                                    placeholder="Email"
                                    className={styles.input}
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    data-test="registerEmail"
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
                                    data-test="registerPassword"
                                />
                            </div>

                        </div>

                        {/* Additional buttons */}
                        <div className={styles.additionalButtons}>

                            {/* Remember Me (Checkbox) */}
                            <div>
                                <SplashCheckbox
                                    inputProps={{
                                        id: "termsAndServices",
                                        name: "termsAndServices",
                                        value: formik.values.termsAndServices,
                                        onChange: (event) => {
                                            let value = event.target.checked? 1 : 0;
                                            formik.setValues({
                                                ...formik.values,
                                                termsAndServices: value
                                            });
                                        },
                                        // @ts-ignore
                                        'data-test': 'registerTermsAndServices'
                                    }}
                                    label={
                                        <span>
                                            I have read and agree to the {' '}
                                            <Link href="/termsAndServices">
                                                <span className={styles.termsAndServicesLink}>
                                                    Terms and Services
                                                </span>
                                            </Link>
                                        </span>
                                    }
                                />
                            </div>

                        </div>

                        {/* Validation */}
                        <div className={styles.validation}>
                            <span>
                                { formik.touched.username && formik.errors.username }
                            </span>
                            <span>
                                { formik.touched.email && formik.errors.email }
                            </span>
                            <span>
                                { formik.touched.password && formik.errors.password }
                            </span>
                            <span>
                                { formik.touched.termsAndServices && formik.errors.termsAndServices }
                            </span>
                        </div>

                        {/* Login Button */}
                        <div className={styles.submitButtonWrapper}>
                            <button className={styles.submitButton} type="submit">
                                Submit
                            </button>
                        </div>

                    </form>

                    {/* Login link */}
                    <div className={styles.loginLinkWrapper}>
                        <span>
                            Already a member? {' '}
                        </span>
                        <Link href="/">
                            <span className={styles.loginLink}>
                                Login
                            </span>
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Signup;
