import reactDom from 'react-dom'

type PortalProps = {
	children: React.ReactNode
}
const ModalPortal = ({ children }: PortalProps) => {
	const $elem = document.getElementById('modal')
	return reactDom.createPortal(children, $elem)
}

export default ModalPortal
