import * as Select from '@radix-ui/react-select';
import * as S from './styles';
import { CaretDown } from '@phosphor-icons/react';
import { useState } from 'react';

interface Props {
  title: string
	children: React.ReactNode,
	onChange: (data: string) => void;
}

export default function SelectComponent({title, children, onChange}: Props) {
	const [open, setOpen] = useState(false);
	return (
		<S.Container>
			<Select.Root open={open} onOpenChange={setOpen} onValueChange={onChange}>
				<S.Trigger>
					<Select.Value placeholder={title}/>
					<Select.Icon>
						<CaretDown size={13} />
					</Select.Icon>
				</S.Trigger>

				<Select.Portal>
					<S.Content position='popper'>
						<Select.ScrollUpButton />
						<Select.Viewport>
							<Select.Group>
								{children}
							</Select.Group>
						</Select.Viewport>
						<Select.ScrollDownButton />
						<Select.Arrow />
					</S.Content>
				</Select.Portal>
			</Select.Root>
		</S.Container>
	);
}