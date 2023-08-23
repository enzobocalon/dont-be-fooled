import api from '../../lib/api';
import { useForm, SubmitHandler  } from 'react-hook-form';
import { Button } from '../Button';
import * as S from './styles';
import { toast } from 'react-toastify';
import { useCallback, useEffect } from 'react';
import { DBType } from '../../types/DBType';

interface Inputs {
	name: string;
	image?: string
}

interface Props {
	onModalClose: () => void;
}

export default function NewProductForm({ onModalClose }: Props) {
	const { register, handleSubmit, formState: { errors }} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		await api.createProducts(data.name, data.image || '');
	};

	const handleCreateProduct = useCallback((data: string) => {
		if (!data) return;
		const response: DBType = JSON.parse(data);
		if (response) {
			toast[response.error ? 'error' : 'success'](response.message);
			onModalClose();
		}
	}, [onModalClose]);

	useEffect(() => {
		const removeListener = window.services.receive('create-products', handleCreateProduct);

		return () => removeListener();
	}, [handleCreateProduct]);

	return (
		<S.Container>
			<small>The required fields are marked with "*".</small>
			<S.Form onSubmit={handleSubmit(onSubmit)}>
				<S.FormItem>
					<label>
            Product's Name *
					</label>
					<S.Input placeholder='Name...' {...register('name', { required: true })} />
				</S.FormItem>
				{errors.name && <S.Error>This field is required</S.Error>}
				<S.FormItem>
					<label>
            Image URL
					</label>
					<S.Input placeholder='http://domain.com/image.png' {...register('image')} />
				</S.FormItem>
				<S.FormItem>
					<Button>
					Create
					</Button>
				</S.FormItem>
			</S.Form>
		</S.Container>
	);
}