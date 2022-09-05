import classNames from 'classnames'
import { formatDistanceToNow } from 'date-fns'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { useContext, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { showToastMessage } from '../util/alert'
import { db } from '../services/firestore'
import './LanguageCard.scss'
import { getStorage } from '../util/storage'

function LanguageCards({ cards, bookmark, setCards, reload }: any) {
	const handleDeleteBookmark = (id: string) => {
		const filtered = cards.filter((doc: any) => doc.id !== id)
		setCards(filtered)
	}
	return (
		<div className="CardWrapper">
			{cards.length > 0 &&
				cards.map((item: any) => (
					<SingleCard
						reload={reload}
						originalItem={item}
						key={item.id}
						bookmark={bookmark}
						deleteCallback={handleDeleteBookmark}
					/>
				))}
		</div>
	)
}
export default LanguageCards

function SingleCard({ originalItem, bookmark, deleteCallback, reload }: any) {
	const { theme }: any = useContext(ThemeContext)

	const [item, setItem] = useState(originalItem)

	const handleRemove = async (id: string) => {
		const cardRef = doc(db, 'users', getStorage('@uid'), 'cards', id)
		await deleteDoc(cardRef)
		reload()
		showToastMessage('it has been deleted', true, theme)
	}

	const handleBookmark = async (id: string) => {
		const cardRef = doc(db, 'users', getStorage('@uid'), 'cards', id)
		//remove from bookmark
		if (bookmark) {
			deleteCallback(id)
			if (item.id === id) {
				try {
					await updateDoc(cardRef, {
						isSaved: false,
					})
					return showToastMessage('removed from Bookmark', true, theme)
				} catch (e: any) {
					return showToastMessage(e.message, false, theme)
				}
			}
		}

		if (item.id === id && item.isSaved)
			return showToastMessage('You can undo from Bookmarks tab', false, theme)
		//add to bookmark
		if (item.id === id) {
			setItem({
				...item,
				isSaved: true,
			})
		}

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
				<div className="Icons">
					<div onClick={() => handleBookmark(item.id)}>
						{item.isSaved ? (
							<i className="ri-bookmark-fill ri-lg" />
						) : (
							<i className="ri-bookmark-line ri-lg" />
						)}
					</div>
					<div onClick={() => handleRemove(item.id)}>
						<i className="ri-delete-bin-line ri-lg" />
					</div>
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
