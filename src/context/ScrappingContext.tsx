import { createContext, useState } from 'react';

interface ScrapContextType {
	start: boolean;
	hasFinishedScrapping: boolean;
	setStart: React.Dispatch<React.SetStateAction<boolean>>
	setHasFinishedScrapping: React.Dispatch<React.SetStateAction<boolean>>
}

interface Props {
	children: React.ReactNode
}

export const ScrapContext = createContext({} as ScrapContextType);

export const ScrapProvider = ({ children }: Props) => {
	const [start, setStart] = useState(false);
	const [hasFinishedScrapping, setHasFinishedScrapping] = useState(true);

	return (
		<ScrapContext.Provider value={{ start, setStart, hasFinishedScrapping, setHasFinishedScrapping }}>
			{children}
		</ScrapContext.Provider>
	);
};
