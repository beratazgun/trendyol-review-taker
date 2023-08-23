const trendyolUrlParser = (url: string): string => {
	const urlParts = url.split('/')
	const fourthEl = urlParts[urlParts.length - 1].split('?')
	urlParts[urlParts.length - 1] = fourthEl[0] + '/yorumlar' + '?' + fourthEl[1]
	return urlParts.join('/')
}

export default trendyolUrlParser
