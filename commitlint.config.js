import { RuleConfigSeverity } from "@commitlint/types";

const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "subject-case": [
      RuleConfigSeverity.Error,
      "never",
      ["sentence-case", "start-case", "pascal-case", "upper-case"],
    ],
  },
};

export default config;
