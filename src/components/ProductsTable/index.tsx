import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import * as S from './styles';
import Table from '../Table';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import api from '../../lib/api';
import { toast } from 'react-toastify';
import { DBType, ProductType, TableType } from '../../types/DBType';
import ReactPaginate from 'react-paginate';
import Search from '../Search';
import { ScrapContext } from '../../context/ScrappingContext';

export default function ProductsTable() {
	const [tableData, setTableData] = useState<TableType | null>(null);
	const [products, setProducts] = useState<ProductType[] | null>(null);
	const [pages, setPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const selectedProductId = useRef('');

	const { hasFinishedScrapping } = useContext(ScrapContext);

	async function getSources(page: number) {
		await api.loadHistory(page);
	}

	async function getProducts() {
		await api.loadProducts();
	}

	useEffect(() => {
		getSources(0);
		getProducts();
	}, [hasFinishedScrapping]);

	const handleHistory = useCallback((data: string) => {
		if (!data) return;
		const response: DBType = JSON.parse(data);
		if (!response) {
			toast.error('Cannot find list of products');
			return;
		}
		setTableData(response.data as TableType);
		setPages(Math.ceil(response.pages! / 10));
	}, []);

	const handleProducts = useCallback((data: string) => {
		if (!data) return;
		const response: DBType = JSON.parse(data);
		if (!response) return;
		setProducts(response.data as ProductType[]);
	}, []);

	const handleSearchId = useCallback((data: string) => {
		if (!data) return;
		const response: DBType = JSON.parse(data);
		if (!response) {
			toast.error('No product history found');
			return;
		}
		setTableData(response.data as TableType);
		setPages(response.pages ? Math.ceil(response.pages / 10) : 0);
	}, []);

	async function handlePageChange(selectedItem: { selected: number }): Promise<void> {
		setCurrentPage(selectedItem.selected);
		if (selectedProductId.current) {
			const id = selectedProductId.current;
			await api.loadHistoryById(id, selectedItem.selected);
			return;
		}
		await api.loadHistory(selectedItem.selected);
	}

	useEffect(() => {
		const removeListeners = [
			window.services.receive('load-history', handleHistory),
			window.services.receive('load-products', handleProducts),
			window.services.receive('load-history-id', handleSearchId),
			window.services.receive('create-products', getProducts)
		];

		return () => removeListeners.forEach(removeListener => removeListener());
	}, [handleHistory, handleProducts, handleSearchId]);

	return (
		<S.Container>
			<S.Header>
				<h2>Products List</h2>

				<Search 
					products={products} 
					selectedProductId={selectedProductId}
					setCurrentPage={setCurrentPage}
				/>
			</S.Header>

			<Table data={tableData} />
			<ReactPaginate
				breakLabel='...'
				previousLabel={<CaretLeft size={12} />}
				nextLabel={<CaretRight size={12} />}
				pageCount={pages}
				forcePage={currentPage}
				className='navigation'
				pageClassName="page-item"
				previousClassName="page-item"
				breakClassName="page-item"
				nextClassName="page-item"
				onPageChange={handlePageChange}
			/>
		</S.Container>
	);
}
