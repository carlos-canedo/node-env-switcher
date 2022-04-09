const EnvSwitcher = require("./EnvSwitcher");

beforeEach(() => {
  const options = {
    environments: [],
    default: null,
  };

  EnvSwitcher.config(options);
});

describe("attributes", () => {
  describe("environments", () => {
    test("set 'environments' => should update 'environments' attribute to an object mapping names as keys and prefixes  as values", () => {
      EnvSwitcher.environments = [
        {
          name: "production",
        },
        {
          name: "development",
          prefix: "DEV",
        },
        {
          name: "test",
          prefix: "TEST",
        },
      ];

      expect(EnvSwitcher.environments).toEqual({
        production: "",
        development: "DEV_",
        test: "TEST_",
      });
    });
  });

  describe("default", () => {
    test("set 'default' => should update 'default' attribute", () => {
      EnvSwitcher.default = "default-environment";
      expect(EnvSwitcher.default).toBe("default-environment");
    });
  });
});

describe("methods", () => {
  describe("config", () => {
    test("execute 'config' with no fields => should throw error ", () => {
      expect(() => {
        EnvSwitcher.config();
      }).toThrow();
    });

    test("execute 'config' with valid options => should update class attributes", () => {
      const options = {
        environments: [],
        default: "default-environment",
      };

      EnvSwitcher.config(options);

      expect(EnvSwitcher.environments).toEqual({});
      expect(EnvSwitcher.default).toEqual("default-environment");
    });
  });

  if (!process.env.NODE_ENV) {
    describe("get (no environment settled)", () => {
      test("get 'EXAMPLE_VAR' without setting up any attributes => should return 'EXAMPLE_VAR' with no prefixes", () => {
        expect(EnvSwitcher.get("EXAMPLE_VAR")).toBe("example_var");
      });

      test("get 'EXAMPLE_VAR' with no 'default' attribute settled => should return 'EXAMPLE_VAR' with no prefixes", () => {
        const options = {
          environments: [
            {
              name: "production",
            },
            {
              name: "development",
              prefix: "DEV",
            },
            {
              name: "test",
              prefix: "TEST",
            },
          ],
        };

        EnvSwitcher.config(options);

        expect(EnvSwitcher.get("EXAMPLE_VAR")).toBe("example_var");
      });

      test("get 'EXAMPLE_VAR' with 'default' attribute settled => should return 'EXAMPLE_VAR' with the 'default' prefix alteration", () => {
        const options = {
          environments: [
            {
              name: "production",
            },
            {
              name: "development",
              prefix: "DEV",
            },
            {
              name: "test",
              prefix: "TEST",
            },
          ],
          default: "test",
        };

        EnvSwitcher.config(options);

        expect(EnvSwitcher.get("EXAMPLE_VAR")).toBe("test_example_var");
      });

      test("get 'EXAMPLE_VAR' after setting up 'default' and 'environments' attribute setup =>  should return 'EXAMPLE_VAR' with the 'default' prefix alteration", () => {
        EnvSwitcher.default = "development";
        EnvSwitcher.environments = [
          {
            name: "production",
          },
          {
            name: "development",
            prefix: "DEV",
          },
          {
            name: "test",
            prefix: "TEST",
          },
        ];

        expect(EnvSwitcher.get("EXAMPLE_VAR")).toBe("dev_example_var");
      });

      test("get 'EXAMPLE_VAR' after setting up 'environments' and 'default' attribute setup =>  should return 'EXAMPLE_VAR' with the 'default' prefix alteration", () => {
        EnvSwitcher.environments = [
          {
            name: "production",
          },
          {
            name: "development",
            prefix: "DEV",
          },
          {
            name: "test",
            prefix: "TEST",
          },
        ];
        EnvSwitcher.default = "test";

        expect(EnvSwitcher.get("EXAMPLE_VAR")).toBe("test_example_var");
      });
    });
  } else {
    describe("get (environment settled)", () => {
      const envVarsMap = {
        production: "example_var",
        development: "dev_example_var",
        test: "test_example_var",
      };

      test("getting 'EXAMPLE_VAR' from current environment => should return the environment 'EXAMPLE_VAR'", () => {
        const options = {
          environments: [
            {
              name: "production",
            },
            {
              name: "development",
              prefix: "DEV",
            },
            {
              name: "test",
              prefix: "TEST",
            },
          ],
          default: "test",
        };

        EnvSwitcher.config(options);

        expect(EnvSwitcher.get("EXAMPLE_VAR")).toBe(
          envVarsMap[process.env.NODE_ENV]
        );
      });
    });
  }

  describe("getFrom", () => {
    test("get 'EXAMPLE_VAR' from 'development' environment without options => should return undefined", () => {
      expect(EnvSwitcher.getFrom("EXAMPLE_VAR", "development")).toBeUndefined();
    });

    test("get 'EXAMPLE_VAR' from 'development' environment setting up 'environments' => should return the 'development' 'EXAMPLE_VAR'", () => {
      const options = {
        environments: [
          {
            name: "production",
          },
          {
            name: "development",
            prefix: "DEV",
          },
          {
            name: "test",
            prefix: "TEST",
          },
        ],
      };

      EnvSwitcher.config(options);

      expect(EnvSwitcher.getFrom("EXAMPLE_VAR", "development")).toBe(
        "dev_example_var"
      );
    });
  });
});
