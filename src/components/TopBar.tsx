import './TopBar.scss'
import Switch from '@mui/material/Switch'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'

function TopBar() {
	const { theme, setTheme } = useContext(ThemeContext)
	const [switchValue] = useState(theme)

	return (
		<div className="TopWrapper">
			<SearchInput />
			<ThemeSwitch setTheme={setTheme} switchValue={switchValue} />
		</div>
	)
}

export default TopBar

function SearchInput() {
	return (
		<div className="Input">
			<div>
				<i className="ri-search-line ri-xl" />
			</div>
			<input type="text" placeholder="search by keyword" />
		</div>
	)
}

function ThemeSwitch({ setTheme }) {
	const [checked, setChecked] = useState(false)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(e.target.checked)
	}
	useEffect(() => {
		console.log(checked)
		if (checked) return setTheme('light')
		setTheme('dark')
	}, [checked])

	return (
		<div className="Switch">
			<i className="ri-sun-line ri-lg" />
			<Switch size="large" checked={checked} onChange={handleChange} />
			<i className="ri-moon-line ri-lg" />
		</div>
	)
}
