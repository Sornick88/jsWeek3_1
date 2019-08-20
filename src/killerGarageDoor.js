const input = "P..OP..P..";

const commands = {
  ".": noCommand,
  P: buttonPush,
  O: obstackleDetected
};

function noCommand(doorState) {
  if (doorState.direction !== 0)
    doorState.position.previous = doorState.position.current;

  doorState.position.current += doorState.direction;

  if (doorState.position.current === 0 || doorState.position.current === 5) {
    doorState.direction = 0;
  }
  return doorState;
}

function buttonPush(doorState) {
  if (doorState.position.current !== 0 && doorState.position.current !== 5) {
    if (doorState.direction !== 0) doorState.direction = 0;
    else {
      doorState.direction =
        doorState.position.previous > doorState.position.current ? -1 : 1;
    }
  } else {
    doorState.direction = doorState.position.current === 0 ? 1 : -1;
  }

  if (doorState.direction !== 0)
    doorState.position.previous = doorState.position.current;

  doorState.position.current += doorState.direction;
  return doorState;
}

function obstackleDetected(doorState) {
  doorState.direction = -doorState.direction;

  if (doorState.direction !== 0)
    doorState.position.previous = doorState.position.current;
  else {
    let bufferPosition =
      doorState.position.previous > doorState.position.current ? 1 : -1;
    doorState.position.previous = doorState.position.current + bufferPosition;
  }

  doorState.position.current += doorState.direction;
  if (doorState.position.current === 0 || doorState.position.current === 5) {
    doorState.direction = 0;
  }
  return doorState;
}

function killerGarageDoor(input) {
  if (typeof input !== "string") {
    return;
  }
  let doorState = {
    direction: 0,
    position: {
      current: 0,
      previous: 0
    }
  };
  let result = [];
  for (let idx = 0; idx !== input.length; idx++) {
    if (!commands.hasOwnProperty(input[idx])) {
      return;
    }
    let moveResult = commands[input[idx]](doorState);
    result.push(moveResult.position.current);
  }

  return result;
}

console.log(killerGarageDoor(input));
