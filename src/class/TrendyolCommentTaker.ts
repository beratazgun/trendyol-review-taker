import { BrowserStarter } from './BrowserStarter'
import trendyolUrlParser from '../helper/trendyolUrlParser'
import puppeteer, { Page, Browser } from 'puppeteer'

interface ReviewInterface {
	comment: string
	commentOwner: string
	commentDate: string
}

class TrendyolCommentTaker extends BrowserStarter {
	constructor(public url: string) {
		super()
	}

	public takeComments = async () => {
		const browser = await this.initializeBrowser()
		const page = await this.initializePage(browser)
		await this.gotoPage(page, this.url)

		const reviews: ReviewInterface[] = await page.evaluate(() => {
			return new Promise<ReviewInterface[]>((resolve) => {
				const reviews: ReviewInterface[] = []
				const scrollEndOfThePage = setInterval(() => {
					if (document.body.scrollHeight !== window.scrollY + 1240) {
						window.scrollTo(0, document.body.scrollHeight)
					} else {
						clearInterval(scrollEndOfThePage)
						const allComments = document.querySelectorAll('.comment')
						Array.from(allComments).forEach((element) => {
							const commentText = element.querySelector('.comment-text')
							const commentOwner = element.querySelector(
								'.comment-info-item:nth-child(1)'
							)
							const commentDate = element.querySelector(
								'.comment-info-item:nth-child(2)'
							)

							reviews.push({
								comment: commentText?.textContent || '',
								commentOwner: commentOwner?.textContent || '',
								commentDate: commentDate?.textContent || '',
							})
						})

						resolve({ ...reviews })
					}
				}, 300)
			})
		})

		// await browser.close()

		return Promise.resolve(reviews)
	}
}

export default TrendyolCommentTaker
