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
				title: '✏️',
				text: 'Please write what you learned!',
				icon: 'warning',
				confirmButtonText: 'Okay',
				confirmButtonColor: '#5285f2',
				background: theme !== 'dark' ? '#fff' : '#1b1b1b',
				color: theme !== 'dark' ? '#111' : '#ddd',
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
					<div className="ColorsText">
						<h5>Select the language colors!</h5>
					</div>
					<ColorPalette />
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
//TODO: select 스타일 수정 필요 ( 사파리 - 크롬 다름 )
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
						: 'Write explanation in your language'
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

const colors = ['pink', 'blue', 'green', 'yellow']
function ColorPalette() {
	return (
		<div className="PaletteWrapper">
			{colors.map((item) => (
				<div className={classNames('Palette', item)} key={item} />
			))}
		</div>
	)
}
