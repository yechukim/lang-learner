import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import languages from '../data/languages'
import ModalPortal from '../portal'
import TextButton from './TextButton'
import classNames from 'classnames'
import './WriteModal.scss'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '../services/firestore'
import { showSweetAlert } from '../util/alert'
import { getStorage, setStorage } from '../util/storage'

type ModalType = {
	isOpen: boolean
	handleClose: () => void
	reload: () => void
}

const colors = ['pink', 'blue', 'green', 'yellow']
type ColorsType = typeof colors[number]

function WriteModal({ isOpen, handleClose, reload }: ModalType) {
	const { theme }: any = useContext(ThemeContext)
	const [savedLang, setSavedLang] = useState(null)

	const [form, setForm] = useState({
		color: colors[0],
		target_lang: '',
		explain_lang: '',
		target_text: '',
		explain_text: '',
		memo: '',
		date: '',
		isSaved: false,
	})

	useEffect(() => {
		const closeOnEsacpe = (e: KeyboardEvent) =>
			e.key === 'Escape' ? handleClose() : null
		document.body.addEventListener('keydown', closeOnEsacpe)

		const savedData = getStorage('@lang')
		if (!savedData) return
		setSavedLang(savedData)

		setForm({
			...form,
			target_lang: savedData.target,
			explain_lang: savedData.explain,
		})

		return () => {
			document.body.removeEventListener('keydown', closeOnEsacpe)
		}
	}, [handleClose])

	if (!isOpen) return null

	const handleClick = () => {
		if (form.target_lang === '')
			return showSweetAlert('Please select Language', theme)
		if (!(form.target_text.length > 0))
			return showSweetAlert('Please write what you learned!', theme)

		const addToDatabase = async () => {
			try {
				await addDoc(collection(db, 'cards'), {
					...form,
					date: Timestamp.now(),
				})
			} catch (e) {
				console.error(e)
				return alert('error')
			}
			//TODO: make a toast message
			return alert('success')
		}
		addToDatabase()

		setForm({
			...form,
			color: colors[0],
			target_text: '',
			explain_text: '',
			memo: '',
			date: '',
		})
		setStorage('@lang', {
			target: form.target_lang,
			explain: form.explain_lang,
		})
		reload()

		handleClose()
	}

	const handleChange = (
		e: { target: HTMLTextAreaElement },
		color?: ColorsType
	) => {
		if (color) return setForm({ ...form, color })
		const { value, name } = e.target
		setForm({ ...form, [name]: value })
	}
	return (
		<ModalPortal wrapperId="portal-root">
			<div className={classNames('ModalWrapper', theme)}>
				<div className="Modal">
					<div className="CloseButton" onClick={handleClose}>
						<i className="ri-close-line ri-2x" />
					</div>
					<h2>What did you learn today?</h2>
					<div className="ColorsText">
						<h5>Select the language colors!</h5>
					</div>
					<ColorPalette
						selectedColor={form.color}
						name="color"
						handleChange={handleChange}
					/>
					<form>
						<LanguageSelect
							value={form.target_text}
							handleChange={handleChange}
							name="target"
							form={form}
						/>
						<LanguageSelect
							name="explain"
							value={form.explain_text}
							handleChange={handleChange}
							form={form}
						/>
						<p>Memo</p>
						<textarea
							value={form.memo}
							onChange={handleChange}
							className="TargetArea memo"
							name="memo"
							cols={40}
							rows={5}
						/>
						<TextButton
							size="large"
							color="blue"
							text="Add"
							handleClick={handleClick}
						/>
					</form>
				</div>
			</div>
		</ModalPortal>
	)
}

export default WriteModal

type LangType = {
	name: string
	value: string
	handleChange: (text: any) => void
	savedLang: { target: string; explain: string }
}
//TODO: select 스타일 수정 필요 ( 사파리 - 크롬 다름 )

function LanguageSelect({ value, handleChange, name, form }: LangType) {
	const LANG = name + '_lang'
	const TEXT = name + '_text'
	return (
		<>
			<div className={classNames('Selection', name)}>
				<label htmlFor={LANG} />
				<select
					name={LANG}
					id={name}
					onChange={handleChange}
					value={name === 'target' ? form.target_lang : form.explain_lang}
				>
					<option value="">languages</option>
					{languages.map((item) => (
						<option key={item.code} value={item.name}>
							{item.name}
						</option>
					))}
				</select>
			</div>
			<textarea
				placeholder={
					name === 'target'
						? 'Write what you learned today'
						: 'Write explanation in your language'
				}
				className="TargetArea"
				value={value}
				onChange={handleChange}
				name={TEXT}
				cols={40}
				rows={5}
			/>
		</>
	)
}

type PaleeteType = {
	selectedColor: ColorsType
	handleChange: (e: any, text: ColorsType) => void
	name: 'color'
}
function ColorPalette({ selectedColor, handleChange }: PaleeteType) {
	return (
		<div className="PaletteWrapper">
			{colors.map((item) => (
				<div
					onClick={(e) => handleChange(e, item)}
					className={classNames('Palette', item)}
					key={item}
				>
					{selectedColor === item && <i className="ri-check-line ri-xl" />}
				</div>
			))}
		</div>
	)
}
