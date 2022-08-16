import { useState } from 'react'
import AddButton from '../components/AddButton'
import LanguageCard from '../components/LanguageCard'
import PageLayout from '../components/PageLayout'
import TopBar from '../components/TopBar'
import WriteModal from '../components/WriteModal'

function HomePage({ handleClick }) {
	return (
		<PageLayout>
			<TopBar />
			<AddButton handleClick={handleClick} />
			<LanguageCard />
		</PageLayout>
	)
}

export default HomePage
