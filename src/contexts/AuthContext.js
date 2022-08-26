import React, { createContext, useContext, useReducer, useEffect } from 'react'

const AuthContext = createContext()

const initialState = { isAuthenticated: false }

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return Object.assign({}, { isAuthenticated: true })
        case "LOGOUT":
            return Object.assign({}, { isAuthenticated: false })
        default:
            return state
    }
}

export default function AuthContextProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuthContext = () => {
    return useContext(AuthContext)
}

export { useAuthContext }