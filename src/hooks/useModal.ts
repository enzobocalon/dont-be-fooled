import {useCallback, useState} from 'react';

export interface IModal {
	type: 'NEW_PRODUCT' | 'NEW_SOURCE' | 'CHANGE_PRODUCT' | null
	title: string | null;
}

export const useModal = () => {
	const [modal, setModal] = useState<IModal | null>(null);

	const handleModal = useCallback(({type, title}: IModal) => {
		setModal({
			type,
			title
		});
	}, []);

	const closeModal = useCallback(() => {
		setModal(null);
	}, []);

	return {
		modal,
		handleModal,
		closeModal
	};
};