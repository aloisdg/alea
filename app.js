const subCount = document.querySelector("#subCount");
const addCount = document.querySelector("#addCount");
const subBonus = document.querySelector("#subBonus");
const addBonus = document.querySelector("#addBonus");

const updateMultiplier = (value) => {
  subCount.disabled = value === 1;
  [...document.querySelectorAll(".multiplier")].forEach((x) => {
    x.textContent = value === 1 ? "" : value;
  });
};

const updateAdditioner = (value) => {
  [...document.querySelectorAll(".additioner")].forEach((x) => {
    x.textContent = value === 0 ? "" : forceSymbol(value);
  });
};

addBonus.onclick = () => {
  const previous = parseInt(document.querySelector("#bonus").textContent);
  const value = previous + 1;
  document.querySelector("#bonus").textContent =
    value === 0 ? 0 : forceSymbol(value);
  updateAdditioner(value);
};

subBonus.onclick = () => {
  const previous = parseInt(document.querySelector("#bonus").textContent);
  const value = previous - 1;
  document.querySelector("#bonus").textContent =
    value === 0 ? 0 : forceSymbol(value);
  updateAdditioner(value);
};

addCount.onclick = () => {
  const previous = parseInt(document.querySelector("#count").textContent);
  const value = previous + 1;
  document.querySelector("#count").textContent = `${value}d`;
  updateMultiplier(value);
};

subCount.onclick = () => {
  const previous = parseInt(document.querySelector("#count").textContent);
  const value = previous - 1;
  document.querySelector("#count").textContent = `${value}d`;
  updateMultiplier(value);
};

const displayDialog = (multiplier, additioner, value, rolls) => {
  const formatBonus = additioner === 0 ? "" : forceSymbol(additioner);
  const formatInput = `${multiplier}d${value}${formatBonus}`;
  favDialog.querySelector(".ask").textContent = formatInput;
  favDialog.querySelector(".sum").textContent = sum(rolls) + additioner;
  favDialog.querySelector(".rolls").textContent = rolls.join(", ");
  favDialog.showModal();
};

document.querySelector("#count").ondblclick = (e) => {
  e.target.textContent = "1d";
  updateMultiplier(1);
};

document.querySelector("#bonus").ondblclick = (e) => {
  e.target.textContent = "0";
  updateAdditioner(0);
};

[...document.querySelectorAll(".dice")].forEach((d) => {
  const value = parseInt(d.dataset.value);
  d.onclick = () => {
    const multiplier = parseInt(document.querySelector("#count").textContent);
    const additioner = parseInt(document.querySelector("#bonus").textContent);
    const rolls = repeat(multiplier, () => roll(value));

    d.firstElementChild.classList.add("wait");
    d.firstElementChild.classList.add("roll");
    setTimeout(() => {
      displayDialog(multiplier, additioner, value, rolls);
      d.firstElementChild.classList.remove("wait");
      d.firstElementChild.classList.remove("roll");
    }, 450);
  };
});

updateMultiplier(1);
updateAdditioner(0);

const closeDialog = (event) => {
  if (event.target.contains(favDialog)) {
    favDialog.close();
  }
};

document.addEventListener("click", closeDialog);

let deferredPrompt;
const addBtn = document.querySelector(".add-button");
addBtn.style.display = "none";

window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = "block";

  addBtn.addEventListener("click", (e) => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = "none";
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      deferredPrompt = null;
    });
  });
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/alea/sw.js");
  });
}
