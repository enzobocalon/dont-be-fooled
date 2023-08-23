import { GearSix } from '@phosphor-icons/react';
import * as S from './styles';

interface Props {
	openSettings: () => void;
}

export default function SettingsFAB ({openSettings}: Props) {
	return (
		<S.Container onClick={openSettings}>
			<GearSix size={24} />
			<span>Settings</span>
		</S.Container>
	);
}