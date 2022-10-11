import {NodeTree} from './node-tree';

export class ITEDConsole {
    readonly history: HTMLElement;
    readonly input: HTMLElement;
    nodeTree: NodeTree;
  
    constructor(_input: HTMLElement) {
        this.input = _input;
        this.history = document.getElementById('history') as HTMLElement;

        this.nodeTree = new NodeTree();  //  Изменить эту строку, если в вашем классе конструктор принимает параметры
    }
  
    public focusAndMoveCursorToTheEnd(): void {
        this.input.focus();
        
        const range: Range = document.createRange();
        const selection = window.getSelection() as Selection;
        const { childNodes } = this.input;
        const lastChildNode = childNodes && childNodes.length - 1;
        
        range.selectNodeContents(lastChildNode === -1 ? this.input : childNodes[lastChildNode]);
        range.collapse(false);
        
        selection.removeAllRanges();
        selection.addRange(range);
    }
  
    public handleCommand(command: String): void {
        const line = document.createElement('DIV');
        line.textContent = `> ${ command }`;
        this.history.appendChild(line);
        
        const result: HTMLElement = document.createElement('DIV');
        switch(command) { 
          case 'test': { 
            result.textContent = `Test command works!`;
            this.history.appendChild(result);
            break; 
          }
          case 'ping': { 
            result.textContent = `pong`;
            this.history.appendChild(result);
            break; 
          }
          //  Здесь необходимо обеспечить обработку комманд
        }
    }
}