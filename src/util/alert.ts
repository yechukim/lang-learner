import Swal from 'sweetalert2'

//TODO: need more custom
function showSweetAlert(msg: string, theme: string) {
	return Swal.fire({
		title: '✏️',
		text: 'Please select Language',
		icon: 'warning',
		confirmButtonText: 'Okay',
		confirmButtonColor: '#5285f2',
		background: theme !== 'dark' ? '#fff' : '#1b1b1b',
		color: theme !== 'dark' ? '#111' : '#ddd',
	})
}
export { showSweetAlert }
