import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import './PageLayout.scss'
import classNames from 'classnames'
type PageProps = {
	children: React.ReactNode
}
function PageLayout({ children }: PageProps) {
	const { theme }: any = useContext(ThemeContext)
	return <div className={classNames('Wrapper', theme)}>{children}</div>
}

export default PageLayout
