import './AddButton.scss'
function AddButton() {
	const handleClick = () => {
		console.log('add button clicked')
	}
	return (
		<div className="ButtonWrapper" onClick={handleClick}>
			<i className="ri-add-line ri-xl"></i>
		</div>
	)
}

export default AddButton
