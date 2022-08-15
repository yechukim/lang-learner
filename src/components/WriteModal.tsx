import classNames from 'classnames'
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import languages from '../data/languages'
import TextButton from './TextButton'
import './WriteModal.scss'

type ModalType = {
	isOpen: boolean
	handleClose: () => void
}
function WriteModal({ isOpen, handleClose }: ModalType) {
	if (!isOpen) return null

	const { theme } = useContext(ThemeContext)
	const handleClick = () => {
		console.log('add click')
	}
	return (
		<div className={classNames('ModalWrapper', theme)}>
			<div className="Modal">
				<div className="CloseButton" onClick={handleClose}>
					<i className={classNames('ri-close-line ri-2x', theme)} />
				</div>
				<h2>What did you learn today?</h2>
				<form action="">
					<LanguageSelect type="target" />
					<LanguageSelect />
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
	)
}

export default WriteModal

type LangType = {
	type?: string
}

function LanguageSelect({ type }: LangType) {
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
			<textarea className="TargetArea" name={type} cols={40} rows={5} />
		</>
	)
}
