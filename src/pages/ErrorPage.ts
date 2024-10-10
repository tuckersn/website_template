import DOMPurify from "dompurify"

export function OnPageLoad() {
	console.log('ErrorPage')

	const errorTitle = new URLSearchParams(window.location.search).get('error-title')
	const errorDescription = new URLSearchParams(window.location.search).get('error-description')

	if (errorTitle) {
		document.querySelector('.error-title')!.textContent = DOMPurify.sanitize(errorTitle)
	}

	if (errorDescription) {
		document.querySelector('.error-description')!.textContent = DOMPurify.sanitize(errorDescription)
	}
}
