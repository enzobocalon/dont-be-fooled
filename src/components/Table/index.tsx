import { TableType } from '../../types/DBType';
import { formatDate } from '../../utils/formatDate';
import { formatPrice } from '../../utils/formatPrice';
import { formatURL } from '../../utils/formatURL';
import * as S from './styles';

interface Props {
	data: TableType | null
}

export default function Table({data}: Props) {
	function handleLink(link: string) {
		window.services.openLink(link);
	}

	return (
		<S.Container>
			<S.Table>
				<S.TableHeader>
					<S.TableRow>
						<S.TableTH>Product</S.TableTH>
						<S.TableTH>Price</S.TableTH>
						<S.TableTH>Date</S.TableTH>
						<S.TableTH>Source</S.TableTH>
					</S.TableRow>
				</S.TableHeader>
				<S.TableBody>
					{
						data && data.map(current => (
							<S.TableRow key={current.id}>
								<S.TableData data-label='Product'>{current.product.name}</S.TableData>
								<S.TableData data-label='Price'>{formatPrice(current.price)}</S.TableData>
								<S.TableData data-label='Date'>{formatDate(current.date)}</S.TableData>
								<S.TableData data-label='Source'>
									<span onClick={() => handleLink(current.source.source)}>{formatURL(current.source.source)}</span>
								</S.TableData>
							</S.TableRow>
						))
					}
				</S.TableBody>
			</S.Table>
		</S.Container>
	);
}