import { useLayoutEffect, useState } from 'react'
import reactDom from 'react-dom'

type PortalProps = {
	children: React.ReactNode
	wrapperId: string
}

function createWrapperAndAppendToBody(wrapperId: string) {
	const wrapperElement = document.createElement('div')
	wrapperElement.setAttribute('id', wrapperId)
	document.body.appendChild(wrapperElement)
	return wrapperElement
}

const ModalPortal = ({
	children,
	wrapperId = 'portal-wrapper',
}: PortalProps) => {
	const [wrapperElement, setWrapperElement] = useState<null | HTMLElement>(null)

	useLayoutEffect(() => {
		let $elem = document.getElementById(wrapperId)
		let systemCreated = false

		if (!$elem) {
			systemCreated = true
			$elem = createWrapperAndAppendToBody(wrapperId)
		}
		setWrapperElement($elem)

		return () => {
			if (systemCreated && $elem!.parentNode) {
				$elem!.parentNode.removeChild($elem!)
			}
		}
	}, [wrapperId])

	if (wrapperElement === null) return null
	return reactDom.createPortal(children, wrapperElement)
}

export default ModalPortal
