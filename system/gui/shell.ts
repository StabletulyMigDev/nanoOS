document.addEventListener('DOMContentLoaded', () => {
    const terminalInput = document.getElementById('terminal-input') as HTMLInputElement;
    const terminalBody = document.getElementById('terminal-body');
    let currentDirectory = '/';
  
    if (terminalInput && terminalBody) {
      terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          handleCommand(terminalInput.value);
          terminalInput.value = '';
        }
      });
  
      function handleCommand(input: string) {
        const output = document.createElement('div');
        output.textContent = '> ' + input;
        if (terminalBody) {
          terminalBody.appendChild(output);
        }
  
        const args = input.trim().split(' ');
        const command = args[0];
        const params = args.slice(1); // Renamed 'arguments' to 'params'
  
        switch (command) {
          case 'help':
            if (terminalBody) {
              output.innerHTML += '<br>Available commands:<br>- help: Display this message<br>- clear: Clear the terminal<br>- ls: List files and directories<br>- ver: Display version information<br>- uname: Display system information<br>- pwd: Print current directory<br>- cd [directory]: Change directory<br>- mkdir [directory]: Create directory<br>- rm [file/directory]: Remove file or directory<br>- echo [text]: Output text to the terminal<br>- show w: Show current time<br>- show c: Show number of characters in terminal';
              terminalBody.appendChild(output);
            }
            break;
          case 'clear':
            if (terminalBody) {
              terminalBody.innerHTML = '';
            }
            break;
          case 'ls':
            if (terminalBody) {
              output.innerHTML += '<br>Files and directories:<br>- file1.txt<br>- file2.txt<br>- folder1<br>- folder2';
              terminalBody.appendChild(output);
            }
            break;
          case 'ver':
            if (terminalBody) {
              output.textContent += '\nTerminal Emulator Version 1.0';
              terminalBody.appendChild(output);
            }
            break;
          case 'uname':
            if (terminalBody) {
              output.textContent += '\nOperating System: nanoOS\nKernel Version: 1.0.0';
              terminalBody.appendChild(output);
            }
            break;
          case 'pwd':
            if (terminalBody) {
              output.textContent += '\n' + currentDirectory;
              terminalBody.appendChild(output);
            }
            break;
          case 'cd':
            if (params.length === 0) {
              output.textContent += '\nUsage: cd [directory]';
            } else {
              const newDir = params[0];
              if (newDir === '/') {
                currentDirectory = '/';
              } else if (newDir === '..') {
                currentDirectory = currentDirectory.split('/').slice(0, -1).join('/') || '/';
              } else {
                currentDirectory += '/' + newDir;
              }
            }
            break;
          case 'mkdir':
            if (params.length === 0) {
              output.textContent += '\nUsage: mkdir [directory]';
            } else {
              const newDir = params[0];
              output.textContent += `\nCreating directory '${newDir}'...`;
            }
            break;
          case 'rm':
            if (params.length === 0) {
              output.textContent += '\nUsage: rm [file/directory]';
            } else {
              const itemToRemove = params[0];
              output.textContent += `\nRemoving '${itemToRemove}'...`;
            }
            break;
          case 'echo':
            if (params.length === 0) {
              output.textContent += '\nUsage: echo [text]';
            } else {
              const textToEcho = params.join(' ');
              output.textContent += '\n' + textToEcho;
            }
            break;
          case 'show w':
            if (terminalBody) {
              const currentTime = new Date().toLocaleTimeString();
              output.textContent += '\nCurrent time is: ' + currentTime;
              terminalBody.appendChild(output);
            }
            break;
          case 'show c':
            if (terminalBody) {
              const numCharacters = terminalBody.innerText.length;
              output.textContent += '\nNumber of characters in terminal: ' + numCharacters;
              terminalBody.appendChild(output);
            }
            break;
          default:
            if (terminalBody) {
              output.textContent += '<br>Command not found. Type "help" for a list of commands.';
              terminalBody.appendChild(output);
            }
            break;
        }
      }
    } else {
      console.error('Terminal elements not found in the DOM.');
    }
  });