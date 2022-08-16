import {
	ChangeEvent,
	ChangeEventHandler,
	useContext,
	useEffect,
	useState,
} from 'react'
import { ThemeContext } from '../context/ThemeContext'
import languages from '../data/languages'
import ModalPortal from '../portal'
import TextButton from './TextButton'
import classNames from 'classnames'
import './WriteModal.scss'
import Swal from 'sweetalert2'

type ModalType = {
	isOpen: boolean
	handleClose: () => void
}

function WriteModal({ isOpen, handleClose }: ModalType) {
	const [first, setFirst] = useState('')
	const [second, setSecond] = useState('')

	useEffect(() => {
		const closeOnEsacpe = (e: KeyboardEvent) =>
			e.key === 'Escape' ? handleClose() : null
		document.body.addEventListener('keydown', closeOnEsacpe)
		return () => {
			document.body.removeEventListener('keydown', closeOnEsacpe)
		}
	}, [handleClose])

	if (!isOpen) return null

	const { theme } = useContext(ThemeContext)

	const handleClick = () => {
		if (!(first.length > 0))
			return Swal.fire({
				title: 'Alert',
				text: 'Please write what you learned today',
				icon: 'warning',
				confirmButtonText: 'Okay',
				confirmButtonColor: '#5285f2',
			})
		// save to db
		// clear state
		setFirst('')
		setSecond('')
		return handleClose()
	}

	const handleChange = (e: { target: HTMLTextAreaElement }) => {
		const { value, name } = e.target
		if (name === 'target') return setFirst(value)
		setSecond(value)
	}
	return (
		<ModalPortal wrapperId="portal-root">
			<div className={classNames('ModalWrapper', theme)}>
				<div className="Modal">
					<div className="CloseButton" onClick={handleClose}>
						<i className="ri-close-line ri-2x" />
					</div>
					<h2>What did you learn today?</h2>
					<form action="">
						<LanguageSelect
							value={first}
							handleChange={handleChange}
							type="target"
						/>
						<LanguageSelect value={second} handleChange={handleChange} />
						<p>Memo</p>
						<textarea
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
	type?: string
	value: string
	handleChange: (text: ChangeEvent<HTMLTextAreaElement>) => void
}

function LanguageSelect({ type, value, handleChange }: LangType) {
	return (
		<>
			<div className={classNames('Selection', type)}>
				<label htmlFor={'lang' + type} />
				<select name="language" id={'lang' + type}>
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
					type === 'target'
						? 'Write what you learned today'
						: 'Write your explanation in your language'
				}
				className="TargetArea"
				value={value}
				onChange={handleChange}
				name={type}
				cols={40}
				rows={5}
			/>
		</>
	)
}
