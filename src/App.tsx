import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import SideMenu from './components/SideMenu'
import BookmarkPage from './pages/BookmarkPage'
import HomePage from './pages/HomePage'
import './styles/main.scss'
import WriteModal from './components/WriteModal'
import { getDocs, collection, query, orderBy } from 'firebase/firestore'
import { db } from './services/firestore'
import { useSearchContext } from './context/SearchContext'

function App() {
	const location = useLocation()
	const { keyword } = useSearchContext()
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
	}, [location])

	const reload = () => {
		getCards()
	}

	const filtered = langCards.filter((item: any) =>
		[item.target_text, item.explain_text].some((text) => text.includes(keyword))
	)

	return (
		<div>
			<SideMenu />
			<WriteModal
				isOpen={isModalOpen}
				handleClose={() => setIsModalOpen(false)}
				reload={reload}
			/>
			<Routes>
				<Route
					path="/"
					element={<HomePage langCards={filtered} handleClick={handleClick} />}
				/>
				<Route path="/bookmarks" element={<BookmarkPage />} />
			</Routes>
		</div>
	)
}

export default App
