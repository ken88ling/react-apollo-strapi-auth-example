import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useAuthToken } from '../config/auth';

export const loginMutationGQL = gql`
  mutation login($login: String!, $password: String!) {
    login(input: { identifier: $login, password: $password }) {
      jwt
    }
  }
`;

export const useLoginMutation = () => {
  const [, setAuthToken, removeAuthtoken] = useAuthToken();

  const [mutation, mutationResults] = useMutation(loginMutationGQL, {
    onCompleted: (data) => {
      setAuthToken(data.login.jwt);
    },
  });

  // full login function
  const login = async (user, password) => {
    console.log('test', user);
    console.log('test', password);
    removeAuthtoken();
    const result = await mutation({
      variables: {
        login: user,
        password,
      },
    });

    console.log('result', result);
    return result;
  };

  return [login, mutationResults];
};
