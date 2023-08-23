import { Info } from '@phosphor-icons/react';
import * as S from './styles';
import TooltipComponent from '../Tooltip';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api from '../../lib/api';
import { Source } from '.prisma/client';
import { useCountdown } from '../../hooks/useCountdown';
import { ScrapContext } from '../../context/ScrappingContext';
import { toast } from 'react-toastify';
import useIsFirstRender from '../../hooks/useIsFirstRender';
import { DBType } from '../../types/DBType';

export default function Status() {
	const [progress, setProgress] = useState(100);
	const [progressStatus, setProgressStatus] = useState<'STARTING'| 'COMPLETED' | 'ON GOING' | null>(null);
	const [targetDate, setTargetDate] = useState(new Date());
	const [hour, minutes, seconds] = useCountdown(targetDate);
	const isFirstRender = useIsFirstRender();

	const {start, setStart, hasFinishedScrapping, setHasFinishedScrapping} = useContext(ScrapContext); 
	
	const progressOffset = useMemo(() => (2 * Math.PI * 115) * ((100 - progress)/100), [progress]);

	const onRenderScrap = useCallback(async () => { // Scrap on openning the app
		setProgressStatus('STARTING');
		setHasFinishedScrapping(false);
	}, [setHasFinishedScrapping]);

	const handleProgress = useCallback(async () => {
		setProgressStatus('ON GOING');
		await api.loadSources();
	}, []);

	async function getDate() {
		await api.loadScrapDate();	
	}

	useEffect(() => {
		getDate();
	}, []);
	
	const handleScrapDate = useCallback(async (data: string) => {
		if (!data) return;
		const scrapDate = new Date(JSON.parse(data));
		setTargetDate(scrapDate);
		if (!hasFinishedScrapping) return;
		const currentDate = new Date();
		if (currentDate >= scrapDate && currentDate >= targetDate) {
			setHasFinishedScrapping(false);
			setProgressStatus('STARTING');
			setProgress(0);
			window.services.scrap.start();
		}

	}, [targetDate, hasFinishedScrapping, setHasFinishedScrapping]);

	useEffect(() => {
		const removeListener = window.services.receive('load-scrap-date', handleScrapDate);

		return () => removeListener();
	}, [handleScrapDate]);

	const handleSources = useCallback((data: string) => {
		if (!data) return;
		const sources: DBType = JSON.parse(data);
		if (sources) {
			const data = sources.data as Source[];
			setProgress(prev => prev + (100/(data.length)));
		}
	}, []);

	useEffect(() => {
		const removeListener = window.services.receive('load-sources', handleSources);

		return () => removeListener();
	}, [handleSources]);

	useEffect(() => {
		if (Math.round(progress) === 100) {
			setHasFinishedScrapping(true);
			setProgressStatus('COMPLETED');
			if (!isFirstRender) {
				toast.success('Scrap completed successfully');
			}
		}		
	}, [progress]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (hour + minutes + seconds < 0) {
			onRenderScrap();
			setTargetDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
		}
	}, [hour, minutes, seconds, onRenderScrap]);

	useEffect(() => {
		const removeListener = window.services.receive('scrap-progress', handleProgress);

		return () => removeListener();
	}, [handleProgress]);

	useEffect(() => {
		if (start) {
			setProgressStatus('STARTING');
			setHasFinishedScrapping(false);
			setProgress(0);
			window.services.scrap.start();
			setTargetDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
		}
		setStart(false);
	}, [start, setStart, setHasFinishedScrapping]);

	return (
		<S.Container>
			<S.Header>
				<h2>Status</h2>
				<TooltipComponent trigger={
					<div>
						<Info size={24} />
					</div>
				}>
					The app will scrap data automatically every 24 hours.
				</TooltipComponent>
			</S.Header>

			<S.Content progress={parseFloat(progress.toFixed(2))} status={progressStatus} onClick={() => onRenderScrap()}>
				<svg width="250" height="250" viewBox="-31.25 -31.25 312.5 312.5" version="1.1" xmlns="http://www.w3.org/2000/svg">
					<circle r="115" cx="125" cy="125" fill="transparent" stroke="#ffffff" strokeWidth="16px" strokeDasharray="722.2px" strokeDashoffset="0"></circle>
					<circle id="progress" r="115" cx="125" cy="125" strokeWidth="16px" strokeLinecap="round" strokeDashoffset={`${progressOffset}px`} fill="transparent" strokeDasharray="722.2px"></circle>
				</svg>
			</S.Content>
			{
				progressStatus === 'ON GOING' ? (
					<p>ON GOING...</p>
				) : progressStatus === 'STARTING' ? (
					<p>Next scrap in <strong>00h00min00s</strong></p>
				) : (
					<p>Next scrap in <strong>{hour}h{minutes < 10 ? `0${minutes}` : minutes}min{seconds < 10 ? `0${seconds}` : seconds}s</strong></p>
				)
			}
		</S.Container>
	);
}