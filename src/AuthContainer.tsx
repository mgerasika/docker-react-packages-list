import React, {useEffect} from "react";
import { gql } from '@apollo/client';
import {useSearchReactReposQuery} from "./generated/graphql-hooks-server2";
import {GithubLoginButton} from "react-social-login-buttons";
import {apolloClientGithub} from "./options/createBookMutationOptions";
import axios from 'axios';
const queryString = require('query-string');

const EXCHANGE_RATES = gql`
    query Books {
        book {
            title
            author
            index
        }
    }
`;

interface Props {}
const clientId = '8f7ad4a059defb21a1b3'
export const GitHub: React.FC<Props> = () => {
    const { loading, error, data } = useSearchReactReposQuery({client:apolloClientGithub});

    useEffect(()=>{
        const query = queryString.parse(document.location.search);
        if(query.code) {
            axios.post('',{
                client_id: clientId,
                client_secret: 'c92aaaa0cf41c6b039277d5d890802a0a983dc9d',
                code:query.code,
                redirect_uri: 'http://localhost:3000',
                state:''
            })
        }
    },[document.location.search]);

    return <div>
        <h3>Github</h3>

        <GithubLoginButton onClick={()=> {

            document.location.href =  `https://github.com/login/oauth/authorize?client_id=${clientId}`
        }} />

        <pre>error:{JSON.stringify(error,null,2)}</pre>
        <pre>data:{JSON.stringify(data,null,2)}</pre>

    </div>
};

