;(function () {
	function waitSeconds(seconds = 0.2) {
		return new Promise(resolve => setTimeout(resolve, seconds * 1000))
	}

	function buttonClick(button) {
		button.click()
	}

	async function addAllProfiles() {
		await waitSeconds()

		const buttons = document.querySelectorAll('[aria-label^="Convidar"]')

		for (const button of buttons) {
			buttonClick(button)

			await waitSeconds()

			const sendButton = document.querySelector(
				'[aria-label="Enviar agora"]'
			)

			buttonClick(sendButton)

			await waitSeconds()
		}
	}

	function goToNextPage() {
		const activePage = document.querySelector(
			'[data-test-pagination-page-btn].active'
		)

		const nextLi = activePage.nextElementSibling

		if (nextLi) {
			const nextPageButton = nextLi.children[0]
			buttonClick(nextPageButton)

			return true
		}

		return false
	}

	async function executePagination() {
		while (true) {
			try {
				await waitSeconds(3)

				await addAllProfiles()

				const hasNextPage = goToNextPage()

				if (!hasNextPage) break
			} catch (error) {
				break
			}
		}
	}

	executePagination()
})()
