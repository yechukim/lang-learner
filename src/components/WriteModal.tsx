import classNames from 'classnames'
import React, { useContext, useEffect } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import languages from '../data/languages'
import ModalPortal from '../portal'
import TextButton from './TextButton'
import './WriteModal.scss'

type ModalType = {
	isOpen: boolean
	handleClose: () => void
}
function WriteModal({ isOpen, handleClose }: ModalType) {
	useEffect(() => {
		const closeOnEsacpe = (e) => (e.key === 'Escape' ? handleClose() : null)
		document.body.addEventListener('keydown', closeOnEsacpe)
		return () => {
			document.body.removeEventListener('keydown', closeOnEsacpe)
		}
	}, [handleClose])

	if (!isOpen) return null

	const { theme } = useContext(ThemeContext)
	const handleClick = () => {
		console.log('add click')
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
		</ModalPortal>
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
