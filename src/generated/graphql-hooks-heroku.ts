import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  getCats?: Maybe<Array<Maybe<Cat>>>;
  getCat?: Maybe<Cat>;
};


export type QueryGetCatArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCat?: Maybe<Cat>;
  githubAuth?: Maybe<GitHubAuthResult>;
};


export type MutationCreateCatArgs = {
  createCatInput?: Maybe<CreateCatInput>;
};


export type MutationGithubAuthArgs = {
  input?: Maybe<CreateGitHubAuthInput>;
};

export type Subscription = {
  __typename?: 'Subscription';
  catCreated?: Maybe<Cat>;
};

export type Cat = {
  __typename?: 'Cat';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Int']>;
};

export type CreateCatInput = {
  name?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Int']>;
};

export type GitHubAuthResult = {
  __typename?: 'GitHubAuthResult';
  access_token?: Maybe<Scalars['String']>;
};

export type CreateGitHubAuthInput = {
  client_id?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export type GithubAuthMutationVariables = Exact<{
  input?: Maybe<CreateGitHubAuthInput>;
}>;


export type GithubAuthMutation = (
  { __typename?: 'Mutation' }
  & { githubAuth?: Maybe<(
    { __typename?: 'GitHubAuthResult' }
    & Pick<GitHubAuthResult, 'access_token'>
  )> }
);


export const GithubAuthDocument = gql`
    mutation GithubAuth($input: CreateGitHubAuthInput) {
  githubAuth(input: $input) {
    access_token
  }
}
    `;
export type GithubAuthMutationFn = Apollo.MutationFunction<GithubAuthMutation, GithubAuthMutationVariables>;

/**
 * __useGithubAuthMutation__
 *
 * To run a mutation, you first call `useGithubAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGithubAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [githubAuthMutation, { data, loading, error }] = useGithubAuthMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGithubAuthMutation(baseOptions?: Apollo.MutationHookOptions<GithubAuthMutation, GithubAuthMutationVariables>) {
        return Apollo.useMutation<GithubAuthMutation, GithubAuthMutationVariables>(GithubAuthDocument, baseOptions);
      }
export type GithubAuthMutationHookResult = ReturnType<typeof useGithubAuthMutation>;
export type GithubAuthMutationResult = Apollo.MutationResult<GithubAuthMutation>;
export type GithubAuthMutationOptions = Apollo.BaseMutationOptions<GithubAuthMutation, GithubAuthMutationVariables>;