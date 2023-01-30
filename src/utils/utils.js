export function setButtonActive(button, selector, isActive) {
  if (isActive) {
    button.disabled = false;
    button.classList.remove(selector);
  } else {
    button.disabled = true;
    button.classList.add(selector);
  }
}
