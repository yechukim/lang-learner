import classNames from 'classnames'
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import './LanguageCard.scss'

function LanguageCard() {
	const { theme } = useContext(ThemeContext)
	return (
		<div className="CardWrapper">
			{Array.from({ length: 5 }).map((item) => (
				<div className={classNames('Card', theme)}>
					<div className="NameOfLanguage">French</div>
				</div>
			))}
		</div>
	)
}

export default LanguageCard
