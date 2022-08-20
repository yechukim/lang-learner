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

function HomePage({ handleClick, langCards, setLangCards }: any) {
	return (
		<PageLayout>
			<TopBar setLangCards={setLangCards} langCards={langCards} />
			<AddButton handleClick={handleClick} />
			<LanguageCards cards={langCards} />
		</PageLayout>
	)
}

export default HomePage
