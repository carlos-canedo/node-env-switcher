class EnvSwitcher {
  static #environments = {};
  static #default = null;
  static #computed_prefix = "";

  static #computePrefix() {
    const prefix =
      this.#environments[
        process.env.NODE_ENV ? process.env.NODE_ENV : this.#default
      ];

    this.#computed_prefix = prefix ? prefix : "";
  }
  static config(options = {}) {
    this.environments = options.environments;
    this.default = options.default;
    this.#computePrefix();

    return this;
  }
  static get(variable) {
    return process.env[this.#computed_prefix + variable];
  }
  static getFrom(variable, environment) {
    return process.env[this.#environments[environment] + variable];
  }

  static set environments(environments) {
    this.#environments = environments.reduce((obj, env) => {
      return {
        ...obj,
        [env.name]: env.prefix ? env.prefix + "_" : "",
      };
    }, {});

    this.#computePrefix();
  }
  static get environments() {
    return this.#environments;
  }
  static set default(environment) {
    this.#default = environment;
    this.#computePrefix();
  }
  static get default() {
    return this.#default;
  }
}

module.exports = EnvSwitcher;
