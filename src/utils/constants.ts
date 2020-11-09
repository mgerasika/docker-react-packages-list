export const CONSTANTS = {
    GITHUB_API_URL : 'https://api.github.com/graphql',
    GITHUB_AUTHORIZE : (clientId:string,state:string) => `https://github.com/login/oauth/authorize?client_id=${clientId}&state=${state}`,
    HEROKU_GRAPHQL_URL : 'https://docker-nestjs.herokuapp.com/graphql',
    LOCALHOST_GRAPHQL_URL : 'http://localhost:5003/graphql'
}