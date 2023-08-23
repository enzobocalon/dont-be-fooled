export function formatURL(url: string): string {
	const storeName = url.split('.')[1];
	return storeName[0].toUpperCase() + storeName.slice(1);
}