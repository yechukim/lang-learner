import React, { createContext, useState } from 'react'

type ThemeProps = {
	children: React.ReactNode
}
export type ThemeType = {
	light: string
	dark: string
}

export const ThemeContext = createContext<ThemeType>('light')

export const ThemeProvider = ({ children }: ThemeProps) => {
	const [theme, setTheme] = useState('light')
	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}
