
import './style.scss'

import layoutHTML from './layout.html?raw'

function renderLayout(pageContent: string): Promise<HTMLDivElement> {
	return new Promise(async (resolve) => {
		const app = document.querySelector<HTMLDivElement>('#app')!
		app.innerHTML = layoutHTML
		const page = app.querySelector<HTMLDivElement>('#page')!
		page.innerHTML = pageContent
		resolve(page)
	})
}

const app = document.querySelector<HTMLDivElement>('#app')!
let lastPath = "";

async function router() {
	const path = window.location.pathname

	if (lastPath === path) {
		return
	}

	switch (path) {
		case '/':
		case '/index':
		case '/home':
			await renderLayout((await import('./pages/index.html?raw')).default)
			break

		case '/about':
			await renderLayout((await import('./pages/AboutPage.html?raw')).default)
			break

		case '/contact':
			await renderLayout((await import('./pages/ContactPage.html?raw')).default);
			(await import('./pages/ContactPage.ts')).OnPageLoad();
			break

		case '/blog':
			await renderLayout((await import('./pages/BlogPage.html?raw')).default);
			(await import('./pages/BlogPage.ts')).OnPageLoad();
			break

		default:
			await renderLayout((await import('./pages/ErrorPage.html?raw')).default);
			(await import('./pages/ErrorPage.ts')).OnPageLoad();
	}

	lastPath = path
}

window.addEventListener('popstate', router)
router()