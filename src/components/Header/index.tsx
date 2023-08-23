import { Cpu, Link, Pause, Play, Plus } from '@phosphor-icons/react';
import * as  S from './styles';
import Dropdown from '../Dropdown';
import { DropdownItem } from '../Dropdown/DropdownItem';
import { useCallback, useContext } from 'react';
import Modal from '../Modal';
import { IModal, useModal } from '../../hooks/useModal';
import NewProductForm from '../NewProductForm';
import NewSourceForm from '../NewSourceForm';
import { ScrapContext } from '../../context/ScrappingContext';
import { Button } from '../Button';

export default function Header() {
	const {modal, handleModal, closeModal} = useModal();
	const {setStart, hasFinishedScrapping } = useContext(ScrapContext);

	const handleModalOpen = useCallback((type: IModal['type'], title: IModal['title']) => {
		handleModal({
			type,
			title
		});
	}, [handleModal]);

	const handleModalClose = useCallback(() => {
		closeModal();
	}, [closeModal]);
	return (
		<>
			<Modal open={Boolean(modal)} title={modal?.title as string} onClose={handleModalClose}>
				{
					modal?.type === 'NEW_PRODUCT' ? (
						<NewProductForm onModalClose={handleModalClose}/>
					) : (
						<NewSourceForm onModalClose={handleModalClose}/>
					)
				}
			</Modal>
				
			<S.Container>
				<S.Wrapper>
					<S.Logo>
						<h1>Don't be Fooled!</h1>
					</S.Logo>

					<S.Actions>
						<Button onClick={() => setStart(true)} disabled={!hasFinishedScrapping}>
							{
								!hasFinishedScrapping ? (
									<>
										<Pause size={20} />
										Scrapping...
									</>
								) : (
									<>
										<Play size={20} />
									Start Scrap
									</>
								)
							}
						</Button>
						<S.Add>
							<Dropdown trigger={<Plus size={28} />}>
								<DropdownItem onClick={() => handleModalOpen('NEW_PRODUCT', 'Add New Product')}>
									<Cpu size={24}/>
							Add new Product
								</DropdownItem>
								<DropdownItem onClick={() => handleModalOpen('NEW_SOURCE', 'Add New Source')}>
									<Link size={24} />
							Add new Source
								</DropdownItem>
							</Dropdown>
						</S.Add>
					</S.Actions>
				</S.Wrapper>
			</S.Container>
		</>
	);
}