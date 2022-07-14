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
  const previous = parseInt(document.querySelector("#bonus").value);
  const value = previous + 1;
  document.querySelector("#bonus").value = value;
  updateAdditioner(value);
};

subBonus.onclick = () => {
  const previous = parseInt(document.querySelector("#bonus").value);
  const value = previous - 1;
  document.querySelector("#bonus").value = value;
  updateAdditioner(value);
};

addCount.onclick = () => {
  const previous = parseInt(document.querySelector("#count").value);
  const value = previous + 1;
  document.querySelector("#count").value = value;
  updateMultiplier(value);
};

subCount.onclick = () => {
  const previous = parseInt(document.querySelector("#count").value);
  const value = previous - 1;
  document.querySelector("#count").value = value;
  updateMultiplier(value);
};

document.querySelector("#count").onchange = (e) => {
  updateMultiplier(parseInt(e.target.value));
};

document.querySelector("#bonus").onchange = (e) => {
  updateAdditioner(parseInt(e.target.value));
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
    const multiplier = parseInt(document.querySelector("#count").value);
    const additioner = parseInt(document.querySelector("#bonus").value);
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
