import React, {useEffect, useState} from "react";
import {GithubLoginButton as LoginButton} from "react-social-login-buttons";
import {useGithubAuthMutation} from "../../generated/graphql-hooks-heroku";
import { getApolloClient } from "../../common/apollo-client";
import { CONSTANTS } from "../../common/constants";
const queryString = require('query-string');

type Props = {
    clientId:string;
    state:string;
    onAuthorized?:(token:string)=>void;
}

export const GithubLoginButton: React.FC<Props> = (props) => {
    const [authMutation,authMutationResponse] = useGithubAuthMutation({client: getApolloClient('nest-heroku')});
    const token = authMutationResponse.data?.githubAuth?.access_token as string;
    
    useEffect(() => {
        const {code} = queryString.parse(document.location.search);
        if (code) {
            authMutation({
                variables: {
                    input: {
                        client_id: props.clientId,
                        code:  code as string,
                        state: props.state
                    }
                }
            }).catch(e => {
                console.log('custom error');
            }) 
        }
    }, [props,authMutation]);
    
    useEffect(()=>{
        if(token) {
            if(props.onAuthorized) {
                props.onAuthorized(token);
            }
        }
    },[token,props])
  

    return<LoginButton onClick={() => {
            document.location.href = CONSTANTS.GITHUB_AUTHORIZE(props.clientId,props.state || '');
        }}  />
};

