import { createContext, useContext, useState } from 'react'

export const SearchContext = createContext<any>(null)
export const SearchProvider = ({ children }: any) => {
	const [keyword, setKeyword] = useState('')

	return (
		<SearchContext.Provider value={{ keyword, setKeyword }}>
			{children}
		</SearchContext.Provider>
	)
}

export const useSearchContext = () => {
	const context = useContext(SearchContext)
	if (!context) {
		throw new Error('no SearchContext')
	}
	return context
}
