const cats = [
  { catWeight: 3, foodWeight: 25, owners: ["Наташа"] },
  { catWeight: 8, foodWeight: 90, owners: ["Марина", "Алиса"] },
  { catWeight: 4, foodWeight: 30, owners: ["Алекс", "Ирина"] },
  { catWeight: 7, foodWeight: 80, owners: ["Борис"] },
];

const reсommendedPortion = (catWeight) => catWeight * 0.75 * 12;
const recommendedPortionFormula = (cat) => {
  if (
    cat.foodWeight > cat.reсommendedPortion * 0.9 &&
    cat.foodWeight < cat.reсommendedPortion * 1.1
  ) {
    return 'нормально'
  }
  else if (cat.foodWeight > cat.reсommendedPortion) {
    return 'много'
  } else if (cat.foodWeight < cat.reсommendedPortion) {
    return 'мало'
  }
};

// 1
cats.forEach((cat) => {
  cat.reсommendedPortion = reсommendedPortion(cat.catWeight);
});
console.log(cats);

// 2 
const findCatsByOwner = function (name) {
  cats.forEach((cat) => {
    if(cat.owners.includes(name)){
      console.log(`Кот владельца ${name}, ест ${recommendedPortionFormula(cat)}`)
    }
  });
};

findCatsByOwner('Алекс');
