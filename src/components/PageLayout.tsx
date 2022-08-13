import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import './PageLayout.scss'
import classNames from 'classnames'
type PageProps = {
	children: React.ReactNode
}
function PageLayout({ children }: PageProps) {
	const { theme } = useContext(ThemeContext)
	console.log(theme)
	return <div className={classNames('Wrapper', theme)}>{children}</div>
}

export default PageLayout
