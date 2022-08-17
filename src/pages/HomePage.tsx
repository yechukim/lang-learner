import { useEffect, useState } from 'react'
import AddButton from '../components/AddButton'
import LanguageCard from '../components/LanguageCard'
import PageLayout from '../components/PageLayout'
import TopBar from '../components/TopBar'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../services/firestore'

type DocDataType = {
	color: string
	date: any
	explain_lang: string
	explain_text: string
	id: string
	memo: string
	target_lang: string
	target_text: string
}

function HomePage({ handleClick }: any) {
	const [langCards, setLangCards] = useState<any>([])

	useEffect(() => {
		const getCards = async () => {
			const querySnapshot = await getDocs(collection(db, 'cards'))
			let docArray: any[] = []
			querySnapshot.forEach((doc) => {
				docArray.push({ ...doc.data(), id: doc.id })
			})
			setLangCards(docArray)
		}

		getCards()
	}, [])

	return (
		<PageLayout>
			<TopBar />
			<AddButton handleClick={handleClick} />
			<LanguageCard cards={langCards} />
		</PageLayout>
	)
}

export default HomePage
