import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';


/* 
    create a token that we check after the user is logged in to solve the problem:
    when the user is logged in ad refreshes the page -> it goes back to home page
    so to prevent this situation => create a token that is made for this user and store it localy 
    check its value every time we use the app and go to another page 
*/
const initialState = {
    user: null
};

if (localStorage.getItem('jwtToken')) {
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));
    // check if the token is expired
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('jwtToken');
    } else {
        initialState.user = decodedToken;
    }
}

/* use AuthContext too pass the value of the current user 
 to other pages */
const AuthContext = createContext({
    user: null,
    login: (userData) => { },
    logout: () => { }
});

/* use authReducer to check the type of action : Login || Logout */
function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload // return the user
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    function login(userData) {
        localStorage.setItem('jwtToken', userData.token);
        dispatch({
            type: 'LOGIN',
            payload: userData
        });
    }

    function logout() {
        localStorage.removeItem('jwtToken');
        dispatch({ type: 'LOGOUT' });
    }

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            {...props}
        />
    );
}

export { AuthContext, AuthProvider };