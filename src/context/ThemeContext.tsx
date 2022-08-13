import React, { createContext, useState } from 'react'

type ThemeProps = {
	children: React.ReactNode
}
export const ThemeContext = createContext<any>('light')

export const ThemeProvider = ({ children }: ThemeProps) => {
	const [theme, setTheme] = useState('light')
	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}
