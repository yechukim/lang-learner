import './Layout.scss'

type LayoutProps = {
	children: React.ReactNode
}
function Layout(props: LayoutProps) {
	return (
		<div className="layout">
			<nav>
				<div className="title">💡 Lang Learner</div>
				<div className="list-wrapper">
					<div className="top-list">
						<li>Home</li>
						<li>Bookmarks</li>
					</div>
					<li>Sign Out</li>
				</div>
			</nav>
		</div>
	)
}

export default Layout
