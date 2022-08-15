import classNames from 'classnames'
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import languages from '../data/languages'
import TextButton from './TextButton'
import './WriteModal.scss'

function WriteModal() {
	const { theme } = useContext(ThemeContext)
	const handleClick = () => {
		console.log('add click')
	}
	return (
		<div className={classNames('ModalWrapper', theme)}>
			<div className="Modal">
				<h2>What did you learn today?</h2>
				<form action="">
					<LanguageSelect target />
					<LanguageSelect />
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
	target?: boolean
}

function LanguageSelect({ target }: LangType) {
	return (
		<>
			<div className={classNames('Selection', target)}>
				<label htmlFor={'lang' + target} />
				<select name="language" id={'lang' + target}>
					<option value="">languages</option>
					{languages.map((item) => (
						<option value={item.name}>{item.name}</option>
					))}
				</select>
			</div>
			<textarea className="TargetArea" name="Text1" cols={40} rows={5} />
		</>
	)
}
