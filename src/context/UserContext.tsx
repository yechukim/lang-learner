import { createContext, useContext, useState } from 'react'

export const UserContext = createContext<any>(null)

export const UserProvider = ({ children }: any) => {
	const [user, setUser] = useState(null)
	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	)
}

export const useUserContext = () => {
	const context = useContext(UserContext)

	if (!context) throw new Error('no userContext')
	return context
}
