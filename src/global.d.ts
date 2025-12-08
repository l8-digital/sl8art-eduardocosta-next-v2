declare global {
  interface Window {
    l8Chat: {
      init: (config: { i: string; d: string }) => void;
    };
  }
}

// Se o seu arquivo não tiver nenhum import/export, 
// adicione a linha abaixo para garantir que ele seja tratado como um módulo.
export {};