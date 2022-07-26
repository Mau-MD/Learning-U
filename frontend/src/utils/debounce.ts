export const debounce = (func: () => void, timeout: number) => {
  let timer: NodeJS.Timeout;

  return (...args: []) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), timeout);
  };
};
