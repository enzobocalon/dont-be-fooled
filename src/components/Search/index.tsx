import { MagnifyingGlass } from '@phosphor-icons/react';
import * as S from './styles';
import { Reducer, createRef, useReducer, useRef } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { ProductType } from '../../types/DBType';
import api from '../../lib/api';

enum ActionKind {
  CHANGE_PRODUCT = 'CHANGE_PRODUCT',
  CHANGE_SEARCH = 'CHANGE_SEARCH'
}

interface SearchState {
  search: string;
  searchedProducts: ProductType[];
}

interface SearchActions {
  type: ActionKind;
  payload?: Partial<SearchState>;
}

const searchReducer = (state: SearchState, action: SearchActions) => {
	const { payload, type } = action;

	switch (type) {
	case ActionKind.CHANGE_PRODUCT:
		return {
			...state,
			searchedProducts: payload?.searchedProducts || [],
		};
	case ActionKind.CHANGE_SEARCH:
		return {
			...state,
			search: payload?.search || '',
		};
	default:
		return state;
	}
};

const initialSearchState: SearchState = {
	search: '',
	searchedProducts: []
};

interface Props {
  products: ProductType[] | null
  selectedProductId: React.MutableRefObject<string>
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export default function Search({products, selectedProductId, setCurrentPage}: Props) {
	const searchRef = createRef<HTMLInputElement>();
	const [searchState, dispatchSearchState] = useReducer<Reducer<SearchState, SearchActions>>(
		searchReducer,
		initialSearchState
	);

	const selectedItem = useRef<number | null>(null);
	function clickOutside() {
		selectedItem.current = null;
		dispatchSearchState({ type: ActionKind.CHANGE_PRODUCT });
	}

	const ref = useClickOutside<HTMLDivElement>(clickOutside);
	function filteringSearch(data?: string) {
		if (!products) return;
	
		const searchFilter = products.filter((currentProduct) =>
			currentProduct.name.toLowerCase().includes((data || searchState.search).toLowerCase())
		);
	
		const isOpen = searchState.search || data;
	
		dispatchSearchState({
			type: ActionKind.CHANGE_PRODUCT,
			payload: {
				searchedProducts: isOpen ? searchFilter : [],
			},
		});
	}

	async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
		const { value } = e.target;
		dispatchSearchState({
			type: ActionKind.CHANGE_SEARCH,
			payload: {
				search: value,
			},
		});

		if (!value) {
			dispatchSearchState({
				type: ActionKind.CHANGE_PRODUCT,
				payload: {},
			});
			selectedProductId.current = '';
			await api.loadHistory(0);
			return;
		}

		if (products) filteringSearch(value);	
	}

	async function handleClickSearch(id: string) {
		selectedProductId.current = id;
		setCurrentPage(0);
		await api.loadHistoryById(id, 0);
		dispatchSearchState({ type: ActionKind.CHANGE_PRODUCT });
	}

	function handleSelectElement(event: React.KeyboardEvent<HTMLInputElement>) {
		if (!searchRef.current || !searchState.searchedProducts.length) return;
		
		const currentIndex = selectedItem.current;
	
		switch (event.key) {
		case 'ArrowDown':
			selectedItem.current = currentIndex === null || currentIndex === searchState.searchedProducts.length - 1
				? 0
				: currentIndex + 1;
			break;
		case 'ArrowUp':
			selectedItem.current = currentIndex === null || currentIndex === 0
				? searchState.searchedProducts.length - 1
				: currentIndex - 1;
			break;
		case 'Enter':
			if (currentIndex !== null) {
				const focusedItem = searchState.searchedProducts[currentIndex];
				handleClickSearch(focusedItem.id);
				selectedItem.current = null;
			}
			break;
		case 'Escape':
			clickOutside();
			break;
		}

		const element: HTMLElement | null = document.querySelector(`[tabIndex="${selectedItem.current}"]`);
		if (element) element.focus();	
	}

	return (
		<S.SearchContainer>
			<S.SearchWrapper>
				<MagnifyingGlass size={24} />
				<input
					type="text"
					placeholder="Search by product name..."
					value={searchState.search}
					onChange={handleSearch}
					onClick={() => filteringSearch()}
					onKeyDown={handleSelectElement}
					ref={searchRef}
				/>
			</S.SearchWrapper>
			<S.SearchItemsContainer ref={ref}>
				{searchState.searchedProducts.map((product, i) => (
					<S.SearchItems key={product.id} onClick={() => handleClickSearch(product.id)} tabIndex={i} role='button' onKeyDown={handleSelectElement}>
						{product.name}
					</S.SearchItems>
				))}
			</S.SearchItemsContainer>
		</S.SearchContainer>
	);
}