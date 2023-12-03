function startNewTimer() {
    const hours = parseInt(document.getElementById('hours').value, 10);
    const minutes = parseInt(document.getElementById('minutes').value, 10);
    const seconds = parseInt(document.getElementById('seconds').value, 10);

    const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalTimeInSeconds > 0) {
      createTimer(totalTimeInSeconds);
    }
  }

  function createTimer(totalTimeInSeconds) {
    const timerContainer = document.getElementById('timerContainer');

    const timer = document.createElement('div');
    timer.className = 'timer';

    const timerText = document.createElement('span');
    timerText.textContent = 'Time left: ';
    timer.appendChild(timerText);

    const timerDisplay = document.createElement('span');
    timerDisplay.innerHTML = formatTime(totalTimeInSeconds);
    timer.appendChild(timerDisplay);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    deleteButton.addEventListener('click', () => {
      clearInterval(timerInterval);
      timerContainer.removeChild(timer);
    });

    timer.appendChild(deleteButton);
    timerContainer.appendChild(timer);

    let timerInterval = setInterval(() => {
      totalTimeInSeconds--;
      timerDisplay.innerHTML = formatTime(totalTimeInSeconds);

      if (totalTimeInSeconds <= 0) {
        clearInterval(timerInterval);
        handleTimerEnd(timer);
      }
    }, 1000);
  }

  function formatTime(totalTimeInSeconds) {
    const hours = Math.floor(totalTimeInSeconds / 3600);
    const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
    const seconds = totalTimeInSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  function handleTimerEnd(timer) {
    // Customize the appearance for Timer End Display here
    timer.style.backgroundColor = ' #f0f757';
    timer.style.color='#3c3d4a'
    timer.textContent = 'Timer is up!';
  
    // Remove the timerDisplay (if previously added)
    const timerDisplay = timer.querySelector('span');
    if (timerDisplay) {
      timer.removeChild(timerDisplay);
    }
  
    // Create a new delete button for the end state
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    deleteButton.addEventListener('click', () => {
    audio.pause();
      timerContainer.removeChild(timer);
    });

    deleteButton.textContent = 'Stop';
    deleteButton.style.backgroundColor = '#34344A';
    deleteButton.style.color = 'white';
    // Append the new delete button
    timer.appendChild(deleteButton);
    const audio = new Audio('emergency-alarm-with-reverb-29431.mp3'); 
    audio.play();
  }