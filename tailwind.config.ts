import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: ["docs/content/**/*.md"],
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
