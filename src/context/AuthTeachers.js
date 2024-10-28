import { createContext, useState} from 'react';

const AuthContextTeacher = createContext({})
export const AuthProvider = ({children}) => {
    const [authteacher, setAuthteacher] = useState(false);
  return (
    <AuthContextTeacher.Provider value={{authteacher, setAuthteacher}}>
        {children}
    </AuthContextTeacher.Provider>
  )
}
export default AuthContextTeacher;