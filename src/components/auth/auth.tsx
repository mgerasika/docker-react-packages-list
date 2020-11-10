import React, {useCallback, useEffect, useState} from "react";
import { useIsAuthorized } from "../../hooks/useIsAuthorized";
import { GithubLoginButton } from "../github-login-button/github-login-button";

interface Props {
    children: any
}


console.log('REACT_APP_CLIENT_ID',process.env.REACT_APP_CLIENT_ID);
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID as string;
const STATE = 'fake_state';

export const AuthContainer: React.FC<Props> = ({children}) => {
    const {loaded,authorized,setAuth} = useIsAuthorized();

    const handleAuthorized = useCallback((token)=>{
        if(token) {
            window.localStorage.setItem("token",token);
        }
        setAuth(true);
    },[]);

    return loaded ? <>
        {!authorized && <GithubLoginButton clientId={CLIENT_ID} state={STATE} onAuthorized={handleAuthorized} />}

        {authorized ? <>{children}</> : null}
    </> : null;
};

