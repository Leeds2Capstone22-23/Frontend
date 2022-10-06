import { VirtualElement } from '../types/types';

function generateGetBoundingClientRect(x = 0, y = 0) {
  return () => ({
    width: 0,
    height: 0,
    top: y,
    right: x,
    bottom: y,
    left: x,
  });
}

export default function detectHighlight(
  event:any,
  window:Window,
): [ VirtualElement, Range] | undefined {
  const selection = window.getSelection();
  const selectedText = selection?.toString();
  const virtualElement = {
    getBoundingClientRect: generateGetBoundingClientRect(),
  };

  if (selectedText && selectedText.length > 0) {
    const selectionRect = selection!.getRangeAt(0).getBoundingClientRect();
    if (selectionRect) {
      virtualElement.getBoundingClientRect = generateGetBoundingClientRect(
        selectionRect.x + selectionRect.width / 2,
        selectionRect.y - 10,
      );
      return [virtualElement as VirtualElement, selection!.getRangeAt(0)];
    }
  }
  return undefined;
}
