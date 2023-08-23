export function formatPrice(price: number): string {
	const formattedCurrency = price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
	return formattedCurrency;
}