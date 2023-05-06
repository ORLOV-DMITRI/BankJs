const cats = [
  { catWeight: 3, foodWeight: 20, owners: ["Наташа"] },
  { catWeight: 6, foodWeight: 90, owners: ["Марина", "Алиса"] },
  { catWeight: 4, foodWeight: 45, owners: ["Алекс", "Ирина"] },
  { catWeight: 7, foodWeight: 80, owners: ["Борис"] },
];

const reсommendedPortion = (catWeight) => catWeight * 0.75 * 12;
const recommendedPortionFormula = (cat) => {};

cats.forEach((cat) => {
  cat.reсommendedPortion = reсommendedPortion(cat.catWeight);
});
console.log(cats);

const ownersCats = cats.flatMap((cat) => cat.owners);
console.log(ownersCats);

cats.forEach((cat) => {
  console.log(recommendedPortionFormula(cat));
  // recommendedPortionFormula(cat);
});
