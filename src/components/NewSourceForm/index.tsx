import { useCallback, useEffect, useState } from 'react';
import { Button } from '../Button';
import SelectComponent from '../Select';
import * as S from './styles';
import api from '../../lib/api';
import { DBType, ProductType } from '../../types/DBType';
import SelectItem from '../Select/Item';
import { toast } from 'react-toastify';

interface Props {
	onModalClose: () => void;
}

export default function NewSourceForm({ onModalClose }: Props) {
	const [product, setProduct] = useState('');
	const [source, setSource] = useState('');
	const [productError, setProductError] = useState(false);
	const [sourceError, setSourceError] = useState(false);
	const [products, setProducts] = useState<ProductType[]>([]);

	async function loadProducts() {
		await api.loadProducts();
	}

	const handleProductChange = useCallback((data: string) => {
		setProduct(data);
	}, []);

	async function handleSubmit(e: React.SyntheticEvent) {
		e.preventDefault();
		setProductError(product ? false : true);
		setSourceError(source ? false : true);

		if (!product || !source) return;

		await api.createSources(product, source);	
	}

	const handleProducts = useCallback((data: string) => {
		if (!data) return;
		const parsedData: DBType = JSON.parse(data ? data : '');
		setProducts(parsedData ? parsedData.data as ProductType[] : []);

	}, []);

	useEffect(() => {
		loadProducts();
	}, []);

	const handleCreateSource = useCallback((data: string) => {
		if (!data) return;
		const response: DBType = JSON.parse(data);
		if (response) {
			toast[response.error ? 'error' : 'success'](response.message);
			onModalClose();
		}
	}, [onModalClose]);

	useEffect(() => {
		const removeListeners =  [
			window.services.receive('create-sources', handleCreateSource),
			window.services.receive('load-products', handleProducts)
		];

		return () => removeListeners.forEach(listener => listener());
	}, [handleCreateSource, handleProducts]);
	return (
		<S.Container>
			<small>The required fields are marked with "*".</small>
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
				{productError && <S.Error>Invalid Product</S.Error>}
				<S.FormItem>
					<label>
            Source *
					</label>
					<S.Input placeholder='http://amazon.com/product' onChange={(e) => setSource(e.target.value)}/>
				</S.FormItem>
				{sourceError && <S.Error>Invalid Source</S.Error>}
				<S.FormItem>
					<Button>
					Create
					</Button>
				</S.FormItem>
			</S.Form>
		</S.Container>
	);
}