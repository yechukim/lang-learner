import './AddButton.scss'

function AddButton({ handleClick }: any) {
	return (
		<div className="ButtonWrapper" onClick={handleClick}>
			<i className="ri-add-line ri-xl"></i>
		</div>
	)
}

export default AddButton
