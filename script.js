let currentProgress = 0;

window.addEventListener("load", () => {
  initButtonAction();
  initProgress();
});

// initialize button action
const initButtonAction = () => {
  const downButton = document.querySelector(".btn-download");
  //   click handler of download button
  downButton.addEventListener("click", () => {
    // change buttons layout
    document.querySelector(".btn-cancel").classList.remove("hidden");
    document.querySelector(".btn-download").classList.add("disabled");

    // zoom out app icon
    document.querySelector(".app-icon").classList.add("scaled-app-icon");

    // show spinner for 1 second
    document.querySelector(".progress-percentage").innerText = "Starting...";
    document.querySelector(".spinner-container").classList.remove("hidden");

    setTimeout(() => {
      // hide spinner
      document.querySelector(".spinner-container").classList.add("hidden");
      // show progress
      document.querySelector(".circular-progress").classList.remove("hidden");
      // add random (5-15) progress every second
      const intervalId = setInterval(() => {
        const target = Math.min(
          currentProgress + Math.floor(Math.random() * 10) + 5,
          100
        );
        setProgress(target);
        // remove count after finish
        if (target >= 100) {
          clearInterval(intervalId);
        }
      }, 500);
    }, 2000);
  });
};

const setProgress = (targetProgress) => {
  // initialize progress
  const progressBar = document.querySelector(".circular-progress");
  if (!progressBar) return;

  const progressValue = document.querySelector(".progress-percentage");

  const innerCircle = progressBar.querySelector(".inner-circle");
  let startValue = currentProgress,
    endValue = targetProgress,
    speed = 30,
    progressColor = progressBar.getAttribute("data-progress-color");

  const progress = setInterval(() => {
    startValue++;
    currentProgress = startValue;

    progressValue.textContent = `${startValue}%`;
    progressValue.style.color = `${progressColor}`;

    innerCircle.style.backgroundColor = `${progressBar.getAttribute(
      "data-inner-circle-color"
    )}`;

    progressBar.style.background = `conic-gradient(${progressColor} ${
      startValue * 3.6
    }deg,${progressBar.getAttribute("data-bg-color")} 0deg)`;
    if (startValue >= endValue) {
      clearInterval(progress);
    }
    if (startValue >= 100) {
      progressValue.innerText = "Pending...";

      // hide progress
      document.querySelector(".circular-progress").classList.add("hidden");

      //show gray progress
      document.querySelector(".path").classList.add("path-gray");
      document.querySelector(".spinner-container").classList.remove("hidden");

      setTimeout(() => {
        //hide gray progress
        document.querySelector(".circular-progress").classList.add("hidden");
        document.querySelector(".spinner-container").classList.add("hidden");
        //zoom in icon
        document.querySelector(".app-icon").classList.remove("scaled-app-icon");
        progressValue.innerText = "Finished.";
      }, 2000);
    }
  }, speed);
};
