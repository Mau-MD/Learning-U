export const scrollWithOffset = (el: HTMLElement, yOffset = -80) => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
  window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
};
