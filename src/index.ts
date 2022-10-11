import './css/reset.css';
import './css/global.css';
import './css/header.css';
import {ITEDConsole} from './ited-console';

const input = document.getElementById('input') as HTMLElement;

let itedConsole: ITEDConsole = new ITEDConsole(input);

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