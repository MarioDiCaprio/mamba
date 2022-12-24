import styles from "./SearchResults.module.sass";
import React from "react";
import {useSearchUsersQuery, useUserBasicDataQuery} from "../../../redux/api/mambaApi";
import HelixSpinner from "../../spinners/HelixSpinner/HelixSpinner";
import ProfilePicture from "../../ProfilePicture/ProfilePicture";


const SearchPreview: React.FC<{ userId: string }> = ({ userId }) => {
    const { isError, isLoading, data: user } = useUserBasicDataQuery(userId);

    if (isLoading || isError || !user) {
        // TODO add proper loading/error state
        return <></>
    }

    return (
        <div className={styles.searchPreviewUser}>
            <ProfilePicture bytes={user.profilePicture} />
            <span>{`@${user.username}`}</span>
        </div>
    );
}


///////////////////////////////////////////////////////////////////////////////


interface SearchResultsProps {
    expression: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ expression }) => {
    const { data: searchResults, isError, isLoading } = useSearchUsersQuery(expression);

    if (isError) {
        return (
            <div className={styles.error}>
                Error fetching data!
            </div>
        );
    }

    if (isLoading || !searchResults) {
        return (
            <div className={styles.spinnerWrapper}>
                <HelixSpinner />
            </div>
        );
    }

    const theSearchResults = searchResults.users.map(userId => <SearchPreview userId={userId} />);

    return (
        <div className={styles.context}>
            { theSearchResults }
        </div>
    );
}

export default SearchResults
