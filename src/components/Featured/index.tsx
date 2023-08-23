import { ArrowsDownUp, DotsThreeVertical } from '@phosphor-icons/react';
import * as S from './styles';
import Dropdown from '../Dropdown';
import { DropdownItem } from '../Dropdown/DropdownItem';

import imagePlaceholder from '../../assets/No_image_available.png';
import { IModal, useModal } from '../../hooks/useModal';
import Modal from '../Modal';
import { useCallback, useContext, useEffect, useState } from 'react';
import FeaturedProductForm from '../FeaturedProductForm';
import { History, Product } from '@prisma/client';
import api from '../../lib/api';
import { toast } from 'react-toastify';
import { ScrapContext } from '../../context/ScrappingContext';
import { formatDate } from '../../utils/formatDate';
import { formatPrice } from '../../utils/formatPrice';
import { FeaturedContext } from '../../context/FeaturedContext';
import { DBType, HistoryType } from '../../types/DBType';

export default function Featured() {
	const {modal, closeModal, handleModal} = useModal();
	const [price, setPrice] = useState('');
	const [date, setDate] = useState('');
	const {hasFinishedScrapping} = useContext(ScrapContext);
	const {featuredProduct, setFeaturedProduct} = useContext(FeaturedContext);

	const loadProductHistory = useCallback(async (id: string) => {
		await api.loadHistoryFeaturedProduct(id);
	}, []);

	const handleFeaturedProductHistory = useCallback((data: string) => {
		if (!data) return;
		const history: DBType = JSON.parse(data);
		const response = history.data as HistoryType[];
		if (!history || !response.length) {
			toast.error('Product history not found. Try scrapping some data...');
			setPrice('');
			setDate('');
			return;
		}

		const historyData = (history.data as History[])[0];
		const date = new Date(historyData.date);
		setDate(formatDate(date));

		setPrice(formatPrice(historyData.price));
	}, []);

	async function loadProduct() {
		await api.loadFeaturedProduct();
	}

	const handleFeaturedProduct = useCallback((data: string) => {
		if (!data) return;
		const response: DBType = JSON.parse(data);
		if (!response || !response.data) {
			toast.error('Product not found');
			return;
		}
		setFeaturedProduct(response.data as Product);
		const { id } = response.data as Product;
		loadProductHistory(id);
		
	}, [loadProductHistory, setFeaturedProduct]);

	const handleModalOpen = useCallback((type: IModal['type'], title: IModal['title']) => {
		handleModal({
			type,
			title
		});
	}, [handleModal]);

	const handleSubmit = useCallback(async (product: Product) => {
		setFeaturedProduct(product);
		await api.createFeaturedProduct(product.id);
		await loadProductHistory(product.id);
	}, [loadProductHistory, setFeaturedProduct]);

	useEffect(() => {
		const removeListeners = [
			window.services.receive('load-featured-product', handleFeaturedProduct),
			window.services.receive('load-history-featured-product', handleFeaturedProductHistory)
		];

		return () => removeListeners.forEach(listener => listener());
	}, [handleFeaturedProduct, handleFeaturedProductHistory]);

	useEffect(() => {
		loadProduct();
	}, [hasFinishedScrapping]); 
	return (
		<>
			<Modal open={Boolean(modal)} onClose={closeModal} title={modal?.title as string}>
				<FeaturedProductForm onModalClose={closeModal} onSubmit={handleSubmit}/>
			</Modal>
			<S.Container>
				<S.Header>
					<h2>Featured Product</h2>

					<S.Options>
						<Dropdown trigger={<DotsThreeVertical size={24} />}>
							<DropdownItem onClick={() => handleModalOpen('CHANGE_PRODUCT', 'Change Featured Product')}>
								<ArrowsDownUp size={24} />
              Change Product
							</DropdownItem>
						</Dropdown>
					</S.Options>
				</S.Header>

				<S.MainContent>
					<img src={featuredProduct?.imageURL ? featuredProduct.imageURL : imagePlaceholder} />

					<S.Info>
						<span>Name:</span>
						<strong>{featuredProduct?.name || 'Not Specified'}</strong>
					</S.Info>
					<S.Info>
						<span>Minimum Price:</span>
						<strong>{price ? price : 'Not Specified'}</strong>
					</S.Info>
					<S.Info>
						<span>Date:</span>
						<strong>{date ? date : '00/00/0000'}</strong>
					</S.Info>
				</S.MainContent>
			</S.Container>
		</>
	);
}