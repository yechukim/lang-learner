import React, { createContext, Dispatch, useEffect, useState } from 'react'
import { getStorage } from '../util/storage'

type ThemeProps = {
	children: React.ReactNode
}
type ThemeType = {
	light: string
	dark: string
}
type ContextType = {
	theme: ThemeType
	setTheme: Dispatch<ContextType>
}

export const ThemeContext = createContext<ContextType | null>(null)

export const ThemeProvider = ({ children }: ThemeProps) => {
	const [theme, setTheme] = useState(getStorage('@theme'))

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}
