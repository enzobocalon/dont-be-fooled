import * as Tooltip from '@radix-ui/react-tooltip';
import { AnimatePresence } from 'framer-motion';
import * as S from './styles';
import React, { useState } from 'react';

interface Props {
  trigger: React.ReactNode
  children: React.ReactNode
}

export default function TooltipComponent ({trigger, children}: Props) {
	const [open, setOpen] = useState(false);

	return (
		<Tooltip.Provider>
			<Tooltip.Root open={open} onOpenChange={setOpen}>
				<Tooltip.Trigger asChild>
					{trigger}
				</Tooltip.Trigger>

				<AnimatePresence>
					{
						open && (
							<Tooltip.Portal forceMount>
								<S.AnimatedDiv 
									initial={{opacity: 0}} 
									animate={{opacity: 1}} 
									exit={{opacity: 0}} 
									transition={{type: 'fade', duration: .3}}>
									<S.StyledContent>
										{children}
										<Tooltip.Arrow className='TooltipArrow '/>
									</S.StyledContent>
								</S.AnimatedDiv>
							</Tooltip.Portal>
						)
					}
				</AnimatePresence>
			</Tooltip.Root>
		</Tooltip.Provider>
	);
}