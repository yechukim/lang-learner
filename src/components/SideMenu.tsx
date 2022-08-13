import './SideMenu.scss'
import { Link } from 'react-router-dom'
function SideMenu() {
	return (
		<nav>
			<div className="title">💡 Lang Learner</div>
			<div className="list-wrapper">
				<div className="top-list">
					<Link to="/">
						<li>Home</li>
					</Link>
					<Link to="/bookmarks">
						<li>Bookmarks</li>
					</Link>
				</div>
				<li>Sign Out</li>
			</div>
		</nav>
	)
}

export default SideMenu
