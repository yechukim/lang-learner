import AddButton from '../components/AddButton'
import PageLayout from '../components/PageLayout'
import TopBar from '../components/TopBar'
import WriteModal from '../components/WriteModal'

function HomePage() {
	return (
		<PageLayout>
			<TopBar />
			<AddButton />
			<WriteModal />
		</PageLayout>
	)
}

export default HomePage
