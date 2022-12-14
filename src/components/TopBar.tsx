import './TopBar.scss'
import Switch from '@mui/material/Switch'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import classNames from 'classnames'
import { setStorage } from '../util/storage'
import { useSearchContext } from '../context/SearchContext'
import { alpha, styled } from '@mui/material'
function TopBar() {
	const { theme, setTheme }: any = useContext(ThemeContext)

	return (
		<div className="TopWrapper">
			<SearchInput theme={theme} />
			<ThemeSwitch theme={theme} setTheme={setTheme} />
		</div>
	)
}

export default TopBar

function SearchInput({ theme }: any) {
	const { keyword, setKeyword } = useSearchContext()

	const handleSearch = (e: any) => {
		const { value } = e.target
		setKeyword(value)

		if (value.length > 15) return alert("it can't be longer than 15 letters")
	}
	return (
		<div className={classNames('Input', theme)}>
			<div>
				<i className={classNames('ri-search-line ri-xl', theme)} />
			</div>
			<input
				value={keyword}
				onChange={handleSearch}
				className={theme}
				type="text"
				placeholder="search by keyword"
			/>
		</div>
	)
}

function ThemeSwitch({ setTheme, theme }: any) {
	const [checked, setChecked] = useState(theme === 'dark' ? true : false)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(e.target.checked)
	}
	useEffect(() => {
		if (checked) {
			setStorage('@theme', 'dark')
			return setTheme('dark')
		}
		setStorage('@theme', 'light')
		setTheme('light')
	}, [checked])

	return (
		<div className={classNames('Switch', theme)}>
			<i className="ri-sun-line ri-lg" />
			<MintSwitch size="medium" checked={checked} onChange={handleChange} />
			<i className="ri-moon-line ri-lg" />
		</div>
	)
}

const MintSwitch = styled(Switch)(({ theme }) => ({
	'& .MuiSwitch-switchBase.Mui-checked': {
		color: '#49d6c9',
		'&:hover': {
			backgroundColor: alpha('#0DD6C4', theme.palette.action.hoverOpacity),
		},
	},
	'& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
		backgroundColor: '#78D6CD',
	},
}))
