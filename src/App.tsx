import { Route, Routes } from 'react-router-dom'
import SideMenu from './components/SideMenu'
import BookmarkPage from './pages/BookmarkPage'
import HomePage from './pages/HomePage'
import './styles/main.scss'

function App() {
	return (
		<>
			<SideMenu />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/bookmarks" element={<BookmarkPage />} />
			</Routes>
		</>
	)
}

export default App
