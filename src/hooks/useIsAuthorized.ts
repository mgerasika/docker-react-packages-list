import { useEffect, useState } from "react";
import { useViewerLoginQuery } from "../generated/graphql-hooks-github";
import { getApolloClient } from "../common/apollo-client";

type TResult = {
    loaded:boolean;
    authorized:boolean;
    setAuth:(isAuth:boolean)=>void;
}

type State = {
    loaded:boolean;
    authorized:boolean;
}

export const useIsAuthorized = ():TResult => {
    const [state,setState] = useState<State>({authorized:false,loaded:false});
    // TODO check github api for more 'right' way how to check user is auth
    const {data:dataViewerLogin,error:errorViewerLogin} = useViewerLoginQuery({client:getApolloClient('github')});
    useEffect(()=>{
    if(dataViewerLogin) {
        setState(prev => ({...prev, loaded:true, authorized: true}));
    }
    else if(errorViewerLogin)
    {
        setState(prev => ({...prev,loaded:true, authorized: false}));
    }
    else {
        console.error(errorViewerLogin);
    }
},[dataViewerLogin,errorViewerLogin]);

    return {
        authorized:state.authorized,
        loaded:state.loaded,
        setAuth: (val) => setState(prev=> ({...prev,authorized:val}))
    }
}