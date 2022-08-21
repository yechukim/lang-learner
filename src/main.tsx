import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { SearchProvider } from './context/SearchContext'
import { UserProvider } from './context/UserContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<UserProvider>
				<ThemeProvider>
					<SearchProvider>
						<App />
					</SearchProvider>
				</ThemeProvider>
			</UserProvider>
		</BrowserRouter>
	</React.StrictMode>
)
