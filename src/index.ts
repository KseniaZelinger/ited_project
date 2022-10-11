import './css/reset.css';
import './css/global.css';

const history = document.getElementById('history') as HTMLElement;
const input = document.getElementById('input') as HTMLElement;
const cursor = document.getElementById('cursor') as HTMLElement;

function focusAndMoveCursorToTheEnd(e?: any) {  
  input.focus();
  
  const range = document.createRange();
  const selection = window.getSelection() as Selection;
  const { childNodes } = input;
  const lastChildNode = childNodes && childNodes.length - 1;
  
  range.selectNodeContents(lastChildNode === -1 ? input : childNodes[lastChildNode]);
  range.collapse(false);

  selection.removeAllRanges();
  selection.addRange(range);
}

function handleCommand(command: string) {
  const line = document.createElement('DIV');
  line.textContent = `> ${ command }`;
  history.appendChild(line);

  if (command === 'test') {
    const result = document.createElement('DIV');
    result.textContent = `Test command works!`;
    history.appendChild(result);
  }
}

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
      handleCommand(lines[i]);
    }
  
    input.textContent = lastLine;
    
    focusAndMoveCursorToTheEnd();
  }
  
  if (input.innerText.length === 0) {
    input.classList.remove('noCaret');  
  }  
});

document.addEventListener('keydown', (e) => {
  if (e.target !== input) focusAndMoveCursorToTheEnd();
});

input.addEventListener('keydown', (e) => {    
  if (e.key === 'Enter') {
    e.preventDefault();
        
    handleCommand(input.textContent!);    
    input.textContent = '';
    focusAndMoveCursorToTheEnd();
  }
});

input.focus();