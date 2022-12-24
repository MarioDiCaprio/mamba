import styles from "./Base.module.sass";
import React, { useState } from "react";
import { useRouter } from "next/router";
import LoginPanel from "./LoginPanel/LoginPanel";
import AccountPanel from "./AccountPanel/AccountPanel";
import LinksPanel from "./LinksPanel/LinksPanel";
import LoadingPanel from "./LoadingPanel/LoadingPanel";
import FriendsPanel from "./FriendsPanel/FriendsPanel";
import SearchResults from "./SearchResults/SearchResults";
import TopBar from "./TopBar/TopBar";
import {UserResponse} from "../../redux/models/user";
import useClient from "../../hooks/useClient";


/**
 * This panel returns either a login panel, an account panel
 * or a loading panel based on the user's login status. This
 * panel is only visible on large screens.
 * @returns A corresponding panel
 * @see {@link LoadingPanel}, {@link LoginPanel}, {@link AccountPanel}
 */
const LoginOrAccountPanel: React.FC = () => {
    const { data, isLoading, isError } = useClient();

    if (isLoading) {
        return <LoadingPanel />;
    }
    // if user not logged in: return login panel
    if (isError || !data) {
        return <LoginPanel />;
    }
    // if user is logged in: return account panel
    return <AccountPanel user={data as UserResponse} />;
}


/**
 * This is the sidebar. It contains the title, the login (or account)
 * panel and links to other pages. This component is responsive and is
 * rendered differently on large-, medium- and small-sized screens.
 * @returns The sidebar component
 * @see {@link LinksPanel}, {@link LoginOrAccountPanel}
 */
const Sidebar: React.FC = () => {
    return (
        <div className={styles.sidebar}>
            {/* Box 1 */}
            <div className={styles.sidebarBox1}>
                {/* Logo (large screens only) */}
                <img src="/logo/logo-full.png" className={styles.sidebarLogo} alt="" />
                {/* Logo (medium screens only) */}
                <img src="/logo/logo-icon.png" className={styles.sidebarLogoSmall} alt="" />
                {/* Login- or Account Panel (large screens only) */}
                <div className={styles.loginOrAccountPanel}>
                    <LoginOrAccountPanel />
                </div>
            </div>
            {/* Box 2 */}
            <div className={styles.sidebarBox2}>
                <LinksPanel  />
            </div>
        </div>
    );
}


/**
 * The props for the `<Base />` component.
 * @see {@link Base}
 */
interface BaseProps {
    /**
     * The children of this node. These are rendered inside
     * of the main panel in the center.
     * */
    children?: React.ReactNode;
}

/**
 * This is the main component. It renders a sidebar, a topbar, a members-panel and
 * the actual content. This component is also very responsive and renders differently
 * on large-, medium- and small-sized screens. This component is intended to be a
 * template for most other pages.
 * @param props The component's props
 * @returns The base component
 * @see {@link BaseProps}
 */
const Base: React.FC<BaseProps> = (props) => {
    const router = useRouter();
    const { data: client } = useClient();
    const [searchExpression, setSearchExpression] = useState<string>('');

    function handleMakePostButtonClicked() {
        router.push('/createPost');
    }

    function handleSearch(expression: string) {
        setSearchExpression(expression);
    }

    const context =
        (searchExpression.length > 0)?
            <SearchResults expression={searchExpression} />
            :
            <>
                {/* Button to make a post */}
                <button className={styles.makePostButton} onClick={handleMakePostButtonClicked}>
                    Make A Post
                </button>
                {/* Content */}
                { props.children }
            </>

    return (
        <div className={styles.main}>

            {/* The sidebar */}
            <Sidebar />

            {/* Container for everything else */}
            <div className={styles.container}>

                {/* The topbar */}
                <TopBar user={client} onSearch={handleSearch} />

                {/* A wrapper for the content- and members panel */}
                <div className={styles.contextWrapper}>

                    {/* Wrapper for the actual content */}
                    <div className={styles.context}>
                        { context }
                    </div>

                    {/* The members panel */}
                    <div className={styles.members}>
                        <FriendsPanel />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Base;
