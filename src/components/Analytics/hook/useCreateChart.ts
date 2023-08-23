import { useEffect, useState } from 'react';
import { HistoryType } from '../../../types/DBType';
import { formatDate } from '../../../utils/formatDate';

type Labels = string[]

function getLabels(): Labels {
	const labels: Labels = [];
	const today = new Date();

	for (let i = 6; i >= 0; i--) {
		const pastDate = new Date(today);
		pastDate.setDate(today.getDate() - i);
		const label = pastDate.toLocaleString('default', { month: 'long', day: 'numeric' });
		labels.push(label);
	}

	return labels;
}

interface Accumulator {
	sum: number,
	count: number
}

type DefinedPrice<T> = { [key: string]: T}

function calculateAveragePrice(history: HistoryType[]): number[] {
	const groupedData = history.reduce((acc, data) => {
		const { price, date } = data;
		const index = formatDate(date);
		if (!acc[index]) {
			acc[index] = {
				sum: 0,
				count: 0
			};
		}

		acc[index].sum += price;
		acc[index].count++;
		
		return acc;
	}, {} as DefinedPrice<Accumulator>);
	
	if (!groupedData) return [];

	const resultArray: number[] = [];

	const today = new Date();
	const sevenDaysAgo = new Date(today);
	sevenDaysAgo.setDate(today.getDate() - 7);

	//  Requires more testing
	if (sevenDaysAgo.getMonth() !== today.getMonth()) {
		sevenDaysAgo.setMonth(today.getMonth(), 1);
	}

	for (let i = 1; i <= 7; i++) {
		const currentDate = new Date(sevenDaysAgo);
		currentDate.setDate(sevenDaysAgo.getDate() + i);
		sevenDaysAgo.setHours(0, 0, 0, 0);

		const index = formatDate(currentDate);
		const data = groupedData[index];

		if (data) {
			const average = data.count > 0 ? data.sum/data.count : 0;
			resultArray.push(average);
		} else {
			resultArray.push(0);
		}
	}

	return resultArray;
}

export default function useCreateChart() {
	const [history, setHistory] = useState<HistoryType[] | null>(null);
	const [labels] = useState<Labels>(getLabels());
	const [average, setAverage] = useState<number[]>([]);

	useEffect(() => {
		if (history) setAverage(calculateAveragePrice(history));
	}, [history]);
	return {
		average,
		labels,
		setHistory
	};
}