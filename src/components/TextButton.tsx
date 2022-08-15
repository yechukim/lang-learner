import classNames from 'classnames'
import React from 'react'
import './TextButton.scss'

type ButtonType = {
	text: string
	handleClick: () => void
	size: 'small' | 'large'
	color: 'pink' | 'yellow' | 'orange' | 'green' | 'blue'
}

function TextButton({ text, handleClick, size, color }: ButtonType) {
	const handleButton = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault()
		handleClick()
	}
	return (
		<div className="TextButton">
			<button className={classNames(size, color)} onClick={handleButton}>
				{text}
			</button>
		</div>
	)
}

export default TextButton
