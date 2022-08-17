import classNames from 'classnames'
import { formatDistanceToNow } from 'date-fns'
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import './LanguageCard.scss'

function LanguageCard({ cards }) {
	const { theme } = useContext(ThemeContext)
	console.log(cards)
	function formatDate(date) {
		return formatDistanceToNow(date) + ' ago'
	}
	return (
		<div className="CardWrapper">
			{cards.length > 0 &&
				cards.map((item) => (
					<div key={item.id} className={classNames('Card', theme)}>
						<div className="CardTop">
							<div className={classNames('NameOfLanguage', item.color)}>
								{item.target_lang}
							</div>
							<div>
								<i className="ri-bookmark-line ri-lg" />
							</div>
						</div>
						<div className="CardMain">{item.target_text}</div>
						{item.explain_lang && (
							<div
								className={classNames('NameOfLanguage', item.color, 'Explain')}
							>
								{item.explain_lang}
							</div>
						)}
						{item.explain_text && (
							<div className="CardMain">{item.explain_text}</div>
						)}

						{item.memo && (
							<div className="Memo">
								<p>Memo</p>
								<div>{item.memo}</div>
							</div>
						)}
						<div className="Date">
							{item.date && <div>{formatDate(item.date.toDate())}</div>}
						</div>
					</div>
				))}
		</div>
	)
}

export default LanguageCard
