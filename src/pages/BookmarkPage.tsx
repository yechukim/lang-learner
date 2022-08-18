import { useEffect, useState } from 'react'
import LanguageCards from '../components/LanguageCards'
import PageLayout from '../components/PageLayout'
import { db } from '../services/firestore'
import { collection, query, where, getDocs } from 'firebase/firestore'

function BookmarkPage() {
	const [savedCards, setSavedCards] = useState<object>([])

	const getCards = async () => {
		const q = query(collection(db, 'cards'), where('isSaved', '==', true))
		const querySnapshot = await getDocs(q)
		let docArray: any = []
		querySnapshot.forEach((doc) => {
			docArray.push({ ...doc.data(), id: doc.id })
		})
		setSavedCards(docArray)
	}
	useEffect(() => {
		getCards()
	}, [])
	return (
		<PageLayout>
			<LanguageCards cards={savedCards} />
		</PageLayout>
	)
}

export default BookmarkPage
