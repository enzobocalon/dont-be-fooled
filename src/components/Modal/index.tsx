import { X } from '@phosphor-icons/react';
import ReactPortal from '../ReactPortal';
import * as S from './styles';
import { AnimatePresence } from 'framer-motion';

interface Props {
  open: boolean;
  onClose: () => void;
	title: string;
	children: React.ReactNode
}

export default function Modal({children, open, onClose, title}: Props) {
	return (
		<AnimatePresence>
			{
				open && (
					<ReactPortal containerId='modal-root'>
						<S.Overlay 
							onClick={onClose} 
							initial={{opacity: 0}} 
							animate={{opacity: 1}} 
							exit={{opacity: 0}} 
							transition={{type: 'fade', duration: .2}}>
							<S.Container 
								onClick={(e) => e.stopPropagation()} 
								initial={{scale: 0}} animate={{scale: 1}} 
								exit={{opacity: 0}} 
								transition={{type: 'fade', duration: .2}}>
								<S.Header>
									<h2>{title}</h2>
									<X size={24} onClick={onClose}/>
								</S.Header>
								<S.Content>
									{children}
								</S.Content>
							</S.Container>
						</S.Overlay>
					</ReactPortal>
				)
			}
		</AnimatePresence>
	);
}