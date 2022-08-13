import './SideMenu.scss'

function SideMenu() {
	return (
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
	)
}

export default SideMenu
