import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import SideMenu from './components/SideMenu'
import BookmarkPage from './pages/BookmarkPage'
import HomePage from './pages/HomePage'
import './styles/main.scss'
import WriteModal from './components/WriteModal'

function App() {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const handleClick = () => {
		setIsModalOpen(true)
	}
	return (
		<>
			<SideMenu />
			<WriteModal
				isOpen={isModalOpen}
				handleClose={() => setIsModalOpen(false)}
			/>
			<Routes>
				<Route path="/" element={<HomePage handleClick={handleClick} />} />
				<Route path="/bookmarks" element={<BookmarkPage />} />
			</Routes>
		</>
	)
}

export default App
