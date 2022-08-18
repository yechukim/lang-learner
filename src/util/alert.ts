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

function showToastMessage(msg: string, isSuccess: boolean, theme: string) {
	return Swal.mixin({
		toast: true,
		position: 'top-right',
		iconColor: '#ff1d86',
		customClass: {
			popup: 'colored-toast',
		},
		background: theme === 'dark' ? '#1b1b1b' : '#fff',
		showConfirmButton: false,
		timer: 1500,
		timerProgressBar: true,
	}).fire({
		icon: isSuccess ? 'success' : 'error',
		title: msg,
	})
}
export { showSweetAlert, showToastMessage }
