import { createContext, useState } from 'react';
import { ProductType } from '../types/DBType';

interface FeaturedContextType {
  featuredProduct: ProductType | null
  setFeaturedProduct: React.Dispatch<React.SetStateAction<ProductType | null>>
}

interface Props {
	children: React.ReactNode
}

export const FeaturedContext = createContext({} as FeaturedContextType);

export const FeaturedProvider = ({ children }: Props) => {
	const [featuredProduct, setFeaturedProduct] = useState<ProductType | null>(null);

	return (
		<FeaturedContext.Provider value={{ featuredProduct, setFeaturedProduct }}>
			{children}
		</FeaturedContext.Provider>
	);
};
