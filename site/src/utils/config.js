const arcoConfig = window.arcoConfig || {};

export const hostname =
  location.hostname !== arcoConfig.externalHostName &&
  location.hostname !== arcoConfig.internalHostName
    ? arcoConfig.externalHostName
    : location.hostname;
export const apiBasename = `https://${hostname || 'arco.design'}`;
