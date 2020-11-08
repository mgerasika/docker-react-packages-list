import React, {useEffect, useState} from "react";
import {GithubLoginButton} from "react-social-login-buttons";
import {apolloClientGithub, apolloClientHeroku} from "./options/createBookMutationOptions";
import {useGithubAuthMutation} from "./generated/graphql-hooks-server3";
import {useViewerLoginQuery} from "./generated/graphql-hooks-server2";
import queryString from 'query-string';

interface Props {
    children: any
}

type State = {
    isAuth:boolean;
}

// TODO move to docker env
const CLIENT_ID = '8f7ad4a059defb21a1b3';
const STATE = '123';

export const AuthContainer: React.FC<Props> = ({children}) => {
    const [state,setState] = useState<State>({isAuth:false});

     // TODO check github api for more 'right' way how to check user is auth
    const {data,error:myError,loading} = useViewerLoginQuery({client:apolloClientGithub});
    
    useEffect(()=>{
        if(data) {
            console.log('viewer login',data)
            setState(prev => ({...state, isAuth: true}));
        }
    },[data]);

    useEffect(() => {
        const {code} = queryString.parse(document.location.search);
        if (code && myError) {
            authMutation({
                variables: {
                    input: {
                        client_id: CLIENT_ID,
                        code:  code as string,
                        state: STATE
                    }
                }
            }).catch(e => {
                console.log('custom error')
            }) 
        }
    }, [document.location.search,myError]);


    const [authMutation,authMutationResponse] = useGithubAuthMutation({client: apolloClientHeroku});
    const token = authMutationResponse.data?.githubAuth?.access_token as string;
    
    useEffect(()=>{
        
        console.log('token', authMutationResponse);
        if(token) {
            window.localStorage.setItem("token", token);
            setState(prev => ({...state, isAuth: true}));
        }
    },[token])

  

    return <div>
        <h3>Authoration Container</h3>

        {!state.isAuth && <GithubLoginButton onClick={() => {
            document.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&state=${STATE}`
        }}/>}
        {state.isAuth && children}

    </div>
};

