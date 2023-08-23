import puppeteer, { Page, Browser } from 'puppeteer'
import trendyolUrlParser from '../helper/trendyolUrlParser'

export abstract class BrowserStarter {
	protected initializeBrowser = async () => {
		const browser = await puppeteer.launch({
			headless: false,
			defaultViewport: null,
			args: ['--start-maximized'],
		})

		return browser
	}

	protected initializePage = async (browser: Browser) => {
		const page = await browser.newPage()
		return page
	}

	protected gotoPage = async (page: Page, url: string) => {
		await page.goto(trendyolUrlParser(url))
	}

	protected closeBrowser = async (browser: Browser) => {
		await browser.close()
	}
}
