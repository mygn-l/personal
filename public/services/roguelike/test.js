const Vector2D = class {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
};

const Game_Object = class {
  constructor() {
    this.position = new Vector2D(0, 0);
  }
};

const Dropped_Item = class extends Game_Object {
  constructor(name, type) {
    super();
    this.name = name;
    this.type = type; //equipment, consumable, material, etc
  }
};

const Item = class {
  constructor(name) {
    this.name = name;
  }
};

const Party = class {
  constructor() {
    this.beings = [];
  }
};

const Being = class extends Game_Object {
  constructor(name, race, gender) {
    super();
    this.name = name;
    this.race = race;
    this.gender = gender;

    this.strength = 0;
    this.fat = 0;
    this.reaction = 0;
    this.speed = 0;
    this.max_mana = 0;
    this.magic = 0;
    this.charisma = 0;

    this.physical_health = 100;
    this.water = 100;
    this.food = 100;
    this.will = 50;
    this.mana = 0;
    this.sanity = 100;

    this.status_effects = [];

    this.job = "unemployed";

    this.skills = [];

    this.inventory = [];

    this.active_equipment = {
      head: "empty",
      torso: ["shirt", "leather jacket"],
      back: "backpack",
      legs: ["underwear", "pants"],
      feet: ["socks", "leather boots"],
      gloves: "empty",
      handheld: ["dagger"],
      necklace: "empty",
      special: [],
    };

    this.relationships = [];
  }
};

const Relationship = class {
  constructor() {}
};

const Skill = class {
  constructor(name, activation_type) {
    this.name = name;
    this.activation_type = activation_type; //active, passive
  }
};

const Magic_Skill = class extends Skill {
  constructor(name, activation_type, mana_cost) {
    super(name, activation_type);
    this.mana_cost = mana_cost;
  }
};

const Tile = class extends Game_Object {
  constructor() {
    super();
    this.immovables = [];
    this.movables = [];
    this.dropped_items = [];
    this.beings = [];
  }
};

const Space = class {
  constructor(name) {
    this.name = name;
    this.tiles = [];
  }
};

const Home = class extends Space {
  constructor() {
    super("home");
  }
};
