import { useReducer, useContext, createContext } from 'react'
import { SET_USER_TYPE, CLEAR_USER_TYPE } from '../ActionTypes'
import { UserReducer } from '../reducers/UserReducer'

export const UserContext = createContext()


const UserContextProvider = (props) => {
    const [state, dispatch] = useReducer(UserReducer, userType = null)

    const setUser = (user)=>{
        dispatch({type:SET_USER_TYPE, payload:user})
    }
    const clearUser = ()=>{
        dispatch({type:CLEAR_USER_TYPE})
    }
    return(
        <UserContext.Provider value={{state, setUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider