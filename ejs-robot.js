let roads_ = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

function adjList(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
        if (graph[from] == undefined) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }
    for (let [from, to] of edges.map(x => x.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

let roadGraph = adjList(roads_);

class VillageState {
    contructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) return p;
                return {place: destination, address: p.address};
            }).filter(p => p.place != p.address);
            return new VillageState(destination, parcels);
        }
    }
}

VillageState.random = function(parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address_ = randArrayElem(Object.keys(roadGraph));
    let place_;
    do {
      place_ = randArrayElem(Object.keys(roadGraph));
    } while (place_ == address_);
    parcels.push({place: place_, address: address_});
  }
  return new VillageState("Post Office", parcels);
}

function runRobot(state, robot, memory) {
  for (let turn = 0;; turn++) {
    state = VillageState.random();
    if(state.parcels == undefined) {
      console.log('Error: state.parcels undefined');
      break;
    }
    if (state.parcels.length == 0) {
      console.log('Done in ${turn} turns');
      break;
    }
    let action = robot(state, memory);
    state = VillageState.move(state, action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);  
  }
}

function randArrayElem(arr) {
  let index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

function randomRobot(state) {
  return {direction: randArrayElem(roadGraph[state.place])};
}

let mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

function mailRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)};
}

runRobot(VillageState.random(), randomRobot);
runRobot(VillageState.random(), mailRobot, []);