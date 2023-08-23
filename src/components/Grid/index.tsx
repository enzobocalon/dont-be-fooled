import * as S from './styles';

interface Props {
  children: React.ReactNode
}

export default function Grid({children}: Props) {
	return (
		<S.Container>
			<S.Wrapper>
				{children}
			</S.Wrapper>
		</S.Container>
	);
}