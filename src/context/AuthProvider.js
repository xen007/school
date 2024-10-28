import { createContext, useState} from 'react';

const AuthContext = createContext({})
export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(false);
    const [authteacher, setAuthteacher] = useState(false);
  return (
    <AuthContext.Provider value={{auth, setAuth, authteacher, setAuthteacher}}>
        {children}
    </AuthContext.Provider>
  )
}
export default AuthContext;