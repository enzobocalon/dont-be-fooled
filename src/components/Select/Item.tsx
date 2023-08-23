import * as Select from '@radix-ui/react-select';
import * as S from './styles';
import { forwardRef } from 'react';
import { Check } from '@phosphor-icons/react';

interface Props {
  children: React.ReactNode,
  value: string;
}

const SelectItem = forwardRef<HTMLDivElement, Props>(({ children, value, ...props }, ref) => {
	return (
		<S.Item {...props} ref={ref} value={value}>
			<Select.ItemText>{children}</Select.ItemText>
			<Select.ItemIndicator className="SelectItemIndicator">
				<Check size={13} />
			</Select.ItemIndicator>
		</S.Item>
	);
});

export default SelectItem;