import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import SideMenu from './components/SideMenu'
import BookmarkPage from './pages/BookmarkPage'
import HomePage from './pages/HomePage'
import './styles/main.scss'
import WriteModal from './components/WriteModal'
import { getDocs, collection, query, orderBy } from 'firebase/firestore'
import { db } from './services/firestore'

function App() {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const handleClick = () => {
		setIsModalOpen(true)
	}

	const [langCards, setLangCards] = useState<any>([])

	const getCards = async () => {
		const q = query(collection(db, 'cards'), orderBy('date', 'desc'))
		const querySnapshot = await getDocs(q)
		let docArray: any[] = []
		querySnapshot.forEach((doc) => {
			docArray.push({ ...doc.data(), id: doc.id })
		})
		setLangCards(docArray)
	}
	useEffect(() => {
		getCards()
	}, [])
	const reload = () => {
		getCards()
	}

	return (
		<>
			<SideMenu />
			<WriteModal
				isOpen={isModalOpen}
				handleClose={() => setIsModalOpen(false)}
				reload={reload}
			/>
			<Routes>
				<Route
					path="/"
					element={<HomePage langCards={langCards} handleClick={handleClick} />}
				/>
				<Route path="/bookmarks" element={<BookmarkPage />} />
			</Routes>
		</>
	)
}

export default App
