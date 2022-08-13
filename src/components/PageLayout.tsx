import './PageLayout.scss'

type PageProps = {
	children: React.ReactNode
}
function PageLayout({ children }: PageProps) {
	return <div className="Wrapper">{children}</div>
}

export default PageLayout
