import './css/reset.css';
import './css/global.css';
import './task.ts';

const input = document.getElementById('input') as HTMLElement;

// Пока что не нужен
// const cursor = document.getElementById('cursor') as HTMLElement;

class ITEDConsole {
  readonly history: HTMLElement;

  constructor() {
    this.history = document.getElementById('history') as HTMLElement;
  }

  public focusAndMoveCursorToTheEnd(): void {
    input.focus();
  
    const range: Range = document.createRange();
    const selection = window.getSelection() as Selection;
    const { childNodes } = input;
    const lastChildNode = childNodes && childNodes.length - 1;
    
    range.selectNodeContents(lastChildNode === -1 ? input : childNodes[lastChildNode]);
    range.collapse(false);

    selection.removeAllRanges();
    selection.addRange(range);
  }

  public handleCommand(command: String): void {
    const line = document.createElement('DIV');
    line.textContent = `> ${ command }`;
    this.history.appendChild(line);

    if (command === 'test') {
      const result: HTMLElement = document.createElement('DIV');
      result.textContent = `Test command works!`;
      this.history.appendChild(result);
    }
  }
}

let itedConsole: ITEDConsole = new ITEDConsole();

document.addEventListener('selectionchange', () => {
  if (document.activeElement!.id !== 'input') return;
  
  const range = window.getSelection()!.getRangeAt(0);
  const start = range.startOffset;
  const end = range.endOffset;
  const length = input.textContent!.length;
  
  if (end < length) {
    input.classList.add('noCaret');
  } else {
    input.classList.remove('noCaret');
  }
});

input.addEventListener('input', () => {
  if (input.childElementCount > 0) {
    const lines = input.innerText.replace(/\n$/, '').split('\n');
    const lastLine = lines[lines.length - 1];
    
    for (let i = 0; i <= lines.length - 2; ++i) {
      itedConsole.handleCommand(lines[i]);
    }
  
    input.textContent = lastLine;
    
    itedConsole.focusAndMoveCursorToTheEnd();
  }
  
  if (input.innerText.length === 0) {
    input.classList.remove('noCaret');  
  }  
});

document.addEventListener('keydown', (e) => {
  if (e.target !== input) itedConsole.focusAndMoveCursorToTheEnd();
});

input.addEventListener('keydown', (e) => {    
  if (e.key === 'Enter') {
    e.preventDefault();
        
    itedConsole.handleCommand(input.textContent!);    
    input.textContent = '';
    itedConsole.focusAndMoveCursorToTheEnd();
  }
});

input.focus();