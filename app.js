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
  document.querySelector("#bonus").textContent = value === 0 ? 0 : forceSymbol(value)
  updateAdditioner(value);
};

subBonus.onclick = () => {
  const previous = parseInt(document.querySelector("#bonus").textContent);
  const value = previous - 1;
  document.querySelector("#bonus").textContent = value === 0 ? 0 : forceSymbol(value);
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

[...document.querySelectorAll(".dice")].forEach((d) => {
  const value = parseInt(d.dataset.value);
  d.onclick = (e) => {
    const multiplier = parseInt(document.querySelector("#count").textContent);
    const additioner = parseInt(document.querySelector("#bonus").textContent);
    const rolls = repeat(multiplier, () => roll(value));

    d.firstElementChild.classList.add("wait");
    d.firstElementChild.classList.add("roll");
    setTimeout(() => {
      displayDialog(multiplier, additioner, value, rolls);
      d.firstElementChild.classList.remove("wait");
      d.firstElementChild.classList.remove("roll");
    }, 500);
  };
});

updateMultiplier(1);
updateAdditioner(0);
