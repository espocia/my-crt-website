import './style.css';
import { neofetch, whoami, help, jj } from './utils/command.js';
import History from './utils/History.js';

document.querySelector('#app').innerHTML = `
  <div id="terminal-container">
    <div id="command-line"></div>
    <div id="input-console">
      <span id="prompt">
        <span style="color:#00FF41;">[root]</span>
        <span style="color:#33FF00;">⟨cybercafe.net⟩</span>
      </span>
      <form id="terminal-form" action="/" method="POST">
        <input type="text" name="command" id="command" autocomplete="off" placeholder="enter command..." />
        <button type="submit" id="submit" style="display: none"></button>
      </form>
    </div>
  </div>
`;
const app = document.getElementById('app')
const history = new History()
const form = document.getElementById("terminal-form");
const input = document.getElementById("command");
const commandLine = document.getElementById("command-line");
const terminalContainer = document.getElementById("terminal-container");

app.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    history.increment()
    input.value = history.history;
  }
  if (event.key === "ArrowDown") {
    history.decrement()
    input.value = history.history;
  }
})


// Function to scroll to bottom
function scrollToBottom() {
  terminalContainer.scrollTop = terminalContainer.scrollHeight;
}

// Focus input
input.focus();
input.addEventListener("blur", () => {
  setTimeout(() => input.focus(), 0);
});

// Command handling
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Show the command that was entered const commandEcho = document.createElement('p');
  const commandEcho = document.createElement('p');
  commandEcho.style.padding = 0;
  commandEcho.innerHTML = `
    <span style="color:#00FF41;">[root]</span><span style="color:#33FF00;">
      ⟨cybercafe.net⟩</span>
    </span> ${input.value}`;
  commandLine.appendChild(commandEcho);

  const commandElement = document.createElement('p');

  switch (input.value) {
    case 'clear':
      commandLine.innerHTML = "";
      break;
    case 'neofetch':
      neofetch(commandLine);
      break;
    case 'whoami':
      whoami(commandLine);
      break;
    case 'help':
      help(commandLine);
      break;
    case 'jj':
      jj('vibe', commandLine);
      break;
    default:
      commandElement.innerText = `command not found : ${input.value}`;
      commandLine.appendChild(commandElement);
      break;
  }

  // Scroll to bottom after command execution
  setTimeout(scrollToBottom, 0);
  history.history = input.value
  console.log(history.history)

  input.focus();
  input.value = "";
});


// Scanline glitch
setInterval(() => {
  const line = document.createElement('div');
  line.style.position = 'absolute';
  line.style.height = '2px';
  line.style.width = '100%';
  line.style.top = `${Math.random() * 100}%`;
  line.style.background = 'rgba(0,255,0,0.05)';
  line.style.zIndex = '5';
  line.style.pointerEvents = 'none';
  line.style.animation = 'line-flicker 0.3s ease-out forwards';
  terminalContainer.appendChild(line);
  setTimeout(() => line.remove(), 300);
}, 4000);

// Initial neofetch and scroll
neofetch(commandLine);
setTimeout(scrollToBottom, 0);
