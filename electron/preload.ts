import { IpcRendererEvent, contextBridge, ipcRenderer } from 'electron';

function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
	return new Promise(resolve => {
		if (condition.includes(document.readyState)) {
			resolve(true);
		} else {
			document.addEventListener('readystatechange', () => {
				if (condition.includes(document.readyState)) {
					resolve(true);
				}
			});
		}
	});
}

const safeDOM = {
	append(parent: HTMLElement, child: HTMLElement) {
		if (!Array.from(parent.children).find(e => e === child)) {
			parent.appendChild(child);
		}
	},
	remove(parent: HTMLElement, child: HTMLElement) {
		if (Array.from(parent.children).find(e => e === child)) {
			parent.removeChild(child);
		}
	},
};

/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
function useLoading() {
	const className = 'loaders-css__square-spin';
	const styleContent = `
@keyframes square-spin {
  25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
  50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
  75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
  100% { transform: perspective(100px) rotateX(0) rotateY(0); }
}
.${className} > div {
  animation-fill-mode: both;
  width: 50px;
  height: 50px;
  background: #fff;
  animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
}
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #282c34;
  z-index: 9;
}
    `;
	const oStyle = document.createElement('style');
	const oDiv = document.createElement('div');

	oStyle.id = 'app-loading-style';
	oStyle.innerHTML = styleContent;
	oDiv.className = 'app-loading-wrap';
	oDiv.innerHTML = `<div class="${className}"><div></div></div>`;

	return {
		appendLoading() {
			safeDOM.append(document.head, oStyle);
			safeDOM.append(document.body, oDiv);
		},
		removeLoading() {
			safeDOM.remove(document.head, oStyle);
			safeDOM.remove(document.body, oDiv);
		},
	};
}

// ----------------------------------------------------------------------

// eslint-disable-next-line react-hooks/rules-of-hooks
const { appendLoading, removeLoading } = useLoading();
domReady().then(appendLoading);

window.onmessage = ev => {
	ev.data.payload === 'removeLoading' && removeLoading();
};

setTimeout(removeLoading, 4999);

// For production use only, still requires some testing

// const prisma = new PrismaClient({
// 	datasources: {
// 		db: {
// 			url: `file:${dbPath}`,
// 		},
// 	},
// 	// @ts-expect-error internal prop
// 	// see https://github.com/prisma/prisma/discussions/5200
// 	__internal: {
// 		engine: {
// 			binaryPath: qePath,
// 		},
// 	},
// });

// createPrismaClient();

const api = {
	prisma: {
		createProducts: (name: string, image: string) => ipcRenderer.send('create-products', {name, image}),
		loadProducts: () => ipcRenderer.send('load-products'),
		createSources: (productId: string, url: string) => ipcRenderer.send('create-sources', {productId, url}),
		loadScrapDate: () => ipcRenderer.send('load-scrap-date'),
		loadSources: () => ipcRenderer.send('load-sources'),
		loadFeaturedProduct: () => ipcRenderer.send('load-featured-product'),
		loadHistoryFeaturedProduct: (id: string) => ipcRenderer.send('load-history-featured-product', {id}),
		createFeaturedProduct: (id: string) => ipcRenderer.send('create-featured-product', {id}),
		loadHistory: (page: number) => ipcRenderer.send('load-history', {page}),
		loadHistoryById: (id: string, page: number) => ipcRenderer.send('load-history-id', {id, page}),
		loadFeaturedProductHistoryFromLastWeek: () => ipcRenderer.send('load-featured-product-history-from-last-week')
	},
	receive: (channel: string, cb: (...args: unknown[]) => void) => {
		const subscription = (_event: IpcRendererEvent, ...args: unknown[]) => cb(...args);
		ipcRenderer.on(channel, subscription);
		return () => {
			ipcRenderer.removeListener(channel, subscription);
		};
	},
	scrap: {
		start: () => ipcRenderer.send('scrap')
	},
	
	openLink: (link: string) => ipcRenderer.send('open-link', link)
};

contextBridge.exposeInMainWorld('services', api);