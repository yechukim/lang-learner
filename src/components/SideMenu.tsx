import './SideMenu.scss'
import { Link, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { useUserContext } from '../context/UserContext'
import { removeStorage, setStorage } from '../util/storage'
import { showToastMessage } from '../util/alert'

function SideMenu({ isOpen }: any) {
	const { theme }: any = useContext(ThemeContext)
	const navigate = useNavigate()
	const { user, setUser } = useUserContext()

	const handleSignOut = () => {
		setUser(null)
		removeStorage(['@uid', '@lang', '@user', '@theme'])
		navigate('/login')
		showToastMessage('Successfully Signned out', true, theme)
	}
	return (
		<nav className={classNames(theme, isOpen)}>
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
				<li onClick={handleSignOut}>Sign Out</li>
			</div>
		</nav>
	)
}

export default SideMenu
