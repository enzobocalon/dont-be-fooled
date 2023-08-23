import * as S from './styles';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { useCallback, useContext, useEffect, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { ScrapContext } from '../../context/ScrappingContext';
import api from '../../lib/api';
import useIsFirstRender from '../../hooks/useIsFirstRender';
import { toast } from 'react-toastify';
import useCreateChart from './hook/useCreateChart';
import { FeaturedContext } from '../../context/FeaturedContext';
import { DBType, HistoryType } from '../../types/DBType';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top' as const,
		},
		title: {
			display: false,
			text: '',
		},
	},
};

export default function Analytics() {
	const { hasFinishedScrapping } = useContext(ScrapContext);
	const {featuredProduct} = useContext(FeaturedContext);
	const isFirstRender = useIsFirstRender();
	const {labels, average, setHistory} = useCreateChart();

	const data = useMemo(() => {
		return {
			labels,
			datasets: [
				{
					label: `${featuredProduct?.name}`,
					data: average.map(current => current),
					borderColor: '#6C5DD3',
					backgroundColor: '#7b6dd3ff',
				},
			],
		};
	}, [labels, average, featuredProduct]);	

	async function loadProduct() {
		await api.loadFeaturedProductHistoryFromLastWeek();
	}

	const handleFeaturedProductHistory = useCallback((data: string) => {
		if (!data) return;
		const response: DBType = JSON.parse(data);
		if (!response || !response.data) {
			if (!isFirstRender) toast.error('History not found');
			return;
		}

		setHistory(response.data as HistoryType[]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const removeListeners = [
			window.services.receive('load-featured-product-history-from-last-week', handleFeaturedProductHistory)
		];

		return () => removeListeners.forEach(listener => listener());
	}, [handleFeaturedProductHistory]);

	useEffect(() => {
		loadProduct();
	}, [hasFinishedScrapping, featuredProduct]); 
	
	return (
		<S.Container>
			<S.Header>
				<h2>Analytics</h2>
				<small>Featured product average price</small>
			</S.Header>     
			<Line options={options} data={data} />
			<small>** A price of 0 indicates that the data for that day was not successfully scraped or unavailable.</small>
		</S.Container>
	);
}