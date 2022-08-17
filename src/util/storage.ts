function getStorage(key: string) {
	try {
		const value = localStorage.getItem(key)
		if (!value) return
		return JSON.parse(value)
	} catch (e) {
		console.error(e)
	}
}
function setStorage(key: string, value: string) {
	try {
		localStorage.setItem(key, JSON.stringify(value))
	} catch (e) {
		console.error(e)
	}
}
export { setStorage, getStorage }
