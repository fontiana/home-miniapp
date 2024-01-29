declare var window: any;
 
/**
 * Função para comunicação com embarcada android e iphone.
 *
 * @fires window.jsinterface
 * @fires window.webkit.messageHandlers
 *
 * @param {string} met Método que esteja disponibilizado na bridge da embarcada.
 * @param {string} device Tipo de dispositivo (tecnologia) do dispositivo do cliente: android ou
 * iphone. Ideal se retornado do serviço AppConfigService.
 * @param {number|string|Array} params Parâmetro(s) que serão repassados com o método.
 *
 */
export function bridgeInvoker(met: string, device: string, params?: string | number | Array<string | number> | object) {
  if (device === 'android') {
    if (!window.jsinterface || !window.jsinterface[met]) { return null; }
    if (params instanceof Array) {
      return window.jsinterface[met](...params);
    } else if (params) {
      return window.jsinterface[met](params);
    } else {
      return window.jsinterface[met]();
    }
  } else if (device === 'iphone') {
    if (!window.webkit || !window.webkit.messageHandlers || !window.webkit.messageHandlers[met]) { return null; }
    if (params instanceof Array) {
        return window.webkit.messageHandlers[met].postMessage(...params);
    } else {
      return window.webkit.messageHandlers[met].postMessage(params);
    }
  } else {
    return null;
  }
 
}
 
 
 
export function sdkInvoker(sdkName: string, met: string, params?: string | number | Array<string | number | boolean | any>) {
  if (!window[sdkName] || !window[sdkName][met]) { return null; }
  if (params instanceof Array) {
    return window[sdkName][met](...params);
  } else if (params) {
    return window[sdkName][met](params);
  } else {
    return window[sdkName][met]();
  }
}