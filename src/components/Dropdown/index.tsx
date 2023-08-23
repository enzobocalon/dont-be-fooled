import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import * as S from './styles';

interface Props {
  trigger: React.ReactNode,
  children: React.ReactNode,
}

export default function Dropdown({trigger, children}: Props) {
	const [open, setOpen] = useState(false);

	return (
		<DropdownMenu.Root open={open} onOpenChange={setOpen}>
			<DropdownMenu.Trigger asChild>
				{trigger}
			</DropdownMenu.Trigger>

			<AnimatePresence>
				{
					open ? (
						<DropdownMenu.Portal forceMount>
							<S.AnimatedDiv animate={{
								opacity: 1,
								transition: { duration: 0.3},
							}} 
							initial={{ 
								opacity: 0,
							}}
							exit={{
								opacity: 0,
								transition: { duration: 0.3}
							}}
							>
								<S.Dropdown align='end'>
									{children}
								</S.Dropdown>
							</S.AnimatedDiv>
						</DropdownMenu.Portal>
					) : null
				}
			</AnimatePresence>
		</DropdownMenu.Root>
	);
}