import AddButton from '../components/AddButton'
import LanguageCards from '../components/LanguageCards'
import PageLayout from '../components/PageLayout'
import TopBar from '../components/TopBar'

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

function HomePage({ handleClick, langCards }: any) {
	return (
		<PageLayout>
			<TopBar />
			<AddButton handleClick={handleClick} />
			<LanguageCards cards={langCards} />
		</PageLayout>
	)
}

export default HomePage
