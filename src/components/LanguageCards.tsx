import classNames from 'classnames'
import { formatDistanceToNow } from 'date-fns'
import { doc, updateDoc } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { showToastMessage } from '../util/alert'
import { db } from '../services/firestore'
import './LanguageCard.scss'

function LanguageCards({ cards }: any) {
	return (
		<div className="CardWrapper">
			{cards.length > 0 &&
				cards.map((item: any) => (
					<SingleCard originalItem={item} key={item.id} />
				))}
		</div>
	)
}
export default LanguageCards

function SingleCard({ originalItem }: any) {
	const { theme }: any = useContext(ThemeContext)

	const [item, setItem] = useState(Object.assign({}, originalItem))

	const handleBookmark = async (id: string) => {
		if (item.id === id && item.isSaved)
			return showToastMessage('You can undo from Bookmarks tab', false, theme)

		if (item.id === id) {
			setItem({
				...item,
				isSaved: true,
			})
		}
		const cardRef = doc(db, 'cards', id)
		try {
			await updateDoc(cardRef, {
				isSaved: true,
			})
		} catch (e: any) {
			return showToastMessage(e.message, false, theme)
		}
		return showToastMessage('Added to Bookmark', true, theme)
	}
	return (
		<div key={item.id} className={classNames('Card', theme)}>
			<div className="CardTop">
				<div className={classNames('NameOfLanguage', item.color)}>
					{item.target_lang}
				</div>
				<div onClick={() => handleBookmark(item.id)}>
					{item.isSaved ? (
						<i className="ri-bookmark-fill ri-lg" />
					) : (
						<i className="ri-bookmark-line ri-lg" />
					)}
				</div>
			</div>
			<div className="CardMain">{item.target_text}</div>
			{item.explain_lang && (
				<div className={classNames('NameOfLanguage', item.color, 'Explain')}>
					{item.explain_lang}
				</div>
			)}
			{item.explain_text && <div className="CardMain">{item.explain_text}</div>}

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
	)
}

function formatDate(date: Date) {
	return formatDistanceToNow(date) + ' ago'
}
