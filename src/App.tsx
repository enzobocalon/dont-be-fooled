import { GlobalStyle } from './assets/styles/global';
import Header from './components/Header';
import './assets/styles/fonts.css';
import { ThemeProvider } from 'styled-components';
import theme from './assets/styles/theme';
import Grid from './components/Grid';
import GridItem from './components/Grid/Item';
import Status from './components/Status';
import Featured from './components/Featured';
import Analytics from './components/Analytics';
import SettingsFAB from './components/SettingsFAB';
import ProductsTable from './components/ProductsTable';
import { StyledToastContainer } from './components/Toast';
import { ScrapProvider } from './context/ScrappingContext';
import { FeaturedProvider } from './context/FeaturedContext';
import { useCallback, useState } from 'react';
import Modal from './components/Modal';
import Settings from './components/Settings';

function App() {
	const [openSettingsModal, setOpenSettingsModal] = useState(true);

	const handleSettingsModalStatus = useCallback(() => {
		setOpenSettingsModal(prev => !prev);
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<ScrapProvider>
				<Header />
				<FeaturedProvider>
					<Grid>
						<GridItem>
							<Status />
						</GridItem>
						<GridItem>
							<Featured />
						</GridItem>
						<GridItem>
							<Analytics />
						</GridItem>
						<GridItem fullcolumn={1}>
							<ProductsTable />
						</GridItem>
					</Grid>
				</FeaturedProvider>
				<GlobalStyle />

				<SettingsFAB openSettings={handleSettingsModalStatus}/>
				<Modal 
					title='Settings' 
					open={openSettingsModal} 
					onClose={handleSettingsModalStatus}>
					<Settings />
				</Modal>
				<StyledToastContainer position='bottom-left' limit={2}/>
			</ScrapProvider>
		</ThemeProvider>
	);
}

export default App;
