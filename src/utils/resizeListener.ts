import debounce from 'lodash.debounce';
const HANDLER_NAME_SPACE = '__react-grid-carousel-resize-handler';

declare global {
  interface Window {
    [HANDLER_NAME_SPACE]?: Record<string, Function>;
  }
}

const handleResize = debounce((e) => {
  Object.values(window[HANDLER_NAME_SPACE] ?? {}).forEach((handler) => {
    if (typeof handler === 'function') {
      handler(e);
    }
  });
}, 16);

const setupListener = () => {
  window.addEventListener('resize', handleResize);
};

const removeListener = () => {
  window.removeEventListener('resize', handleResize);
};

export const addResizeHandler = (key: string, handler: Function) => {
  if (!window[HANDLER_NAME_SPACE]) {
    window[HANDLER_NAME_SPACE] = {};
    setupListener();
  }

  window[HANDLER_NAME_SPACE]![key] = handler;
};

export const removeResizeHandler = (key: string) => {
  delete window[HANDLER_NAME_SPACE]?.[key];

  if (!Object.keys(window[HANDLER_NAME_SPACE] ?? {})) {
    delete window[HANDLER_NAME_SPACE];
    removeListener();
  }
};
