const input = "2017-05-16 13:45";

function addValue(count, type) {}
function substractValue(count, type) {}

function updateValue() {
  this.value = this.toISOString()
    .split("T")
    .join(" ")
    .substr(0, 16);
}

class UserDate extends Date {
  updateValue() {
    return this.toISOString()
      .split("T")
      .join(" ")
      .substr(0, 16);
  }
  add() {
    this.value = this.updateValue();
  }
  subtract(count, type) {}
}

function UserDate2(input) {
  Date(input);
  this.value = "";
  this.add = addValue;
  this.substract = substractValue;
  this.update = updateValue;
}
UserDate2.prototype = Object.create(Date.prototype);

function date(input) {
  let res = new UserDate(input);
  let res2 = new UserDate2(input);
  return res;
}

console.log(date(input).updateValue());
