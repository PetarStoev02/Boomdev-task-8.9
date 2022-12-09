import EventEmitter from "eventemitter3";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }

  constructor() {
    super();
    this._loading = document.querySelector(".progress");
    this._startLoading(true);
    this._create();
    this.emit(Application.events.READY);
  }

  async _load() {
    const res = await fetch("https://swapi.boom.dev/api/planets");
    const planets = await res.json();
    return planets.results;
  }

  _create() {
    this._load().then((planets) => {
      planets.forEach((element) => {
        const box = document.createElement("div");
        box.classList.add("box");
        box.innerHTML = this._render({
          name: element.name,
          terrain: element.terrain,
          population: element.population,
        });
        this._stopLoading(false);
        document.body.querySelector(".main").appendChild(box);
      });
    });
  }

  _startLoading(){}
  _stopLoading(){}
}
