export function formatDate(providedDate: Date): string {
	const date = new Date(providedDate);
	const formatedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
	return formatedDate;
}