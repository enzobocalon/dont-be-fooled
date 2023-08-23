import {useCallback, useEffect, useState} from 'react';
import api from '../../lib/api';
import { DBType, ProductType } from '../../types/DBType';
import * as S from './styles';
import SelectItem from '../Select/Item';
import SelectComponent from '../Select';
import { Button } from '../Button';
import { Product } from '@prisma/client';
import { toast } from 'react-toastify';

interface Props {
	onModalClose: () => void;
	onSubmit: (product: Product) => void
}

export default function FeaturedProductForm({onModalClose, onSubmit}: Props) {
	const [products, setProducts] = useState<ProductType[]>([]);
	const [productId, setProductId] = useState('');
	
	async function loadProducts() {
		await api.loadProducts();
	}

	const handleProductChange = useCallback((data: string) => {
		setProductId(data);
	}, []);

	const handleSubmit = useCallback((e: React.SyntheticEvent) => {
		e.preventDefault();
		const product = products.find(p => p.id === productId);
		if (!product) {
			toast.error('Invalid product');
			return;
		}
		onSubmit(product);
		onModalClose();
	}, [onModalClose, onSubmit, productId, products]);

	useEffect(() => {
		loadProducts();
	}, []);

	const handleCreateFeaturedProduct = useCallback((data: string) => {
		if (!data) return;
		const response: DBType = JSON.parse(data);
		if (response) {
			setProducts(response ? response.data as ProductType[] : []);
		}
	}, []);

	const handleProducts = useCallback((data: string) => {
		if (!data) return;
		const parsedData: DBType = JSON.parse(data ? data : '');
		setProducts(parsedData ? parsedData.data as ProductType[] : []);
	}, []);

	useEffect(() => {
		const removeListeners = [
			window.services.receive('create-featured-product', handleCreateFeaturedProduct),
			window.services.receive('load-products', handleProducts)
		];

		return () => removeListeners.forEach(listener => listener());
	}, [handleProducts, handleCreateFeaturedProduct]);

	return (
		<S.Form onSubmit={handleSubmit}>
			<S.FormItem>
				<label>
            Product *
				</label>
				<SelectComponent title='Select a Product' onChange={handleProductChange}>
					{products && products.map(product => (
						<SelectItem value={product.id} key={product.id}>{product.name}</SelectItem>
					))}
				</SelectComponent>
			</S.FormItem>
			<S.FormItem>
				<Button>
					Change
				</Button>
			</S.FormItem>
		</S.Form>
	);
}