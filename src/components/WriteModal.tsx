import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import languages from '../data/languages'
import ModalPortal from '../portal'
import TextButton from './TextButton'
import classNames from 'classnames'
import './WriteModal.scss'
import Swal from 'sweetalert2'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '../services/firestore'

type ModalType = {
	isOpen: boolean
	handleClose: () => void
}

const colors = ['pink', 'blue', 'green', 'yellow'] as const

function WriteModal({ isOpen, handleClose }: ModalType) {
	const { theme } = useContext(ThemeContext)

	const [form, setForm] = useState({
		color: colors[0],
		target_lang: '',
		explain_lang: '',
		target_text: '',
		explain_text: '',
		memo: '',
		date: '',
	})

	useEffect(() => {
		const closeOnEsacpe = (e: KeyboardEvent) =>
			e.key === 'Escape' ? handleClose() : null
		document.body.addEventListener('keydown', closeOnEsacpe)
		return () => {
			document.body.removeEventListener('keydown', closeOnEsacpe)
		}
	}, [handleClose])

	if (!isOpen) return null

	const handleClick = () => {
		if (form.target_lang === '')
			return Swal.fire({
				title: '✏️',
				text: 'Please select Language',
				icon: 'warning',
				confirmButtonText: 'Okay',
				confirmButtonColor: '#5285f2',
				background: theme !== 'dark' ? '#fff' : '#1b1b1b',
				color: theme !== 'dark' ? '#111' : '#ddd',
			})

		if (!(form.target_text.length > 0))
			return Swal.fire({
				title: '✏️',
				text: 'Please write what you learned!',
				icon: 'warning',
				confirmButtonText: 'Okay',
				confirmButtonColor: '#5285f2',
				background: theme !== 'dark' ? '#fff' : '#1b1b1b',
				color: theme !== 'dark' ? '#111' : '#ddd',
			})
		// save to db
		const addToDatabase = async () => {
			try {
				await addDoc(collection(db, 'cards'), {
					...form,
					date: Timestamp.now(),
				})
			} catch (e) {
				console.error(e)
			}
		}
		addToDatabase()

		// clear state
		setForm({
			color: colors[0],
			target_lang: '',
			target_text: '',
			explain_lang: '',
			explain_text: '',
			memo: '',
			date: '',
		})

		handleClose()
	}

	const handleChange = (e: { target: HTMLTextAreaElement }) => {
		if (!e?.target) return setForm({ ...form, color: e })
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
						/>
						<LanguageSelect
							name="explain"
							value={form.explain_text}
							handleChange={handleChange}
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
	handleChange: (text: ChangeEvent<HTMLTextAreaElement>) => void
}
//TODO: select 스타일 수정 필요 ( 사파리 - 크롬 다름 )

function LanguageSelect({ value, handleChange, name }: LangType) {
	const LANG = name + '_lang'
	const TEXT = name + '_text'
	return (
		<>
			<div className={classNames('Selection', name)}>
				<label htmlFor={LANG} />
				<select name={LANG} id={name} onChange={handleChange}>
					<option value="">languages</option>
					{languages.map((item) => (
						<option key={item.code} value={item.code}>
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

function ColorPalette({ selectedColor, handleChange, name }) {
	return (
		<div className="PaletteWrapper">
			{colors.map((item) => (
				<div
					name={name}
					onClick={() => handleChange(item)}
					className={classNames('Palette', item)}
					key={item}
				>
					{selectedColor === item && <i className="ri-check-line ri-xl"></i>}
				</div>
			))}
		</div>
	)
}
