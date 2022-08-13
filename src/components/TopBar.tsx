import './TopBar.scss'

function TopBar() {
	return (
		<div className="TopWrapper">
			<SearchInput />
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
