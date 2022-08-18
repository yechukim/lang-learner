import './SideMenu.scss'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
function SideMenu() {
	const { theme }: any = useContext(ThemeContext)

	return (
		<nav className={classNames(theme)}>
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
				{/* <li>Sign Out</li> */}
			</div>
		</nav>
	)
}

export default SideMenu
