import { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import SideMenu from './components/SideMenu'
import BookmarkPage from './pages/BookmarkPage'
import HomePage from './pages/HomePage'
import './styles/main.scss'
import WriteModal from './components/WriteModal'
import { getDocs, collection, query, orderBy } from 'firebase/firestore'
import { db } from './services/firestore'
import { useSearchContext } from './context/SearchContext'
import LoginPage from './pages/LoginPage'
import { useUserContext } from './context/UserContext'
import { getStorage } from './util/storage'

function App() {
	const location = useLocation()
	const { keyword } = useSearchContext()
	const { user, setUser } = useUserContext()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		const data = getStorage('@user')

		if (data) setUser(data)
		if (!data) navigate('/login')
	}, [])

	const handleClick = () => {
		setIsModalOpen(true)
	}
	const [langCards, setLangCards] = useState<any>([])

	const getCards = async () => {
		const q = query(
			collection(db, 'users', getStorage('@uid'), 'cards'),
			orderBy('date', 'desc')
		)
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
			{user && <SideMenu />}
			<WriteModal
				isOpen={isModalOpen}
				handleClose={() => setIsModalOpen(false)}
				reload={reload}
			/>
			<Routes>
				<Route
					path="/login"
					element={
						!user ? (
							<LoginPage />
						) : (
							<HomePage langCards={filtered} handleClick={handleClick} />
						)
					}
				/>
				<Route
					path="/"
					element={
						user ? (
							<HomePage langCards={filtered} handleClick={handleClick} />
						) : (
							<LoginPage />
						)
					}
				/>
				<Route
					path="/bookmarks"
					element={!user ? <LoginPage /> : <BookmarkPage />}
				/>
			</Routes>
		</div>
	)
}

export default App
