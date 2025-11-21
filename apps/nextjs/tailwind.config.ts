import type { Config } from "tailwindcss";

import baseConfig from "@saasfly/tailwind-config";

export default {
  content: [...baseConfig.content, "../../packages/ui/src/**/*.{ts,tsx}"],
  presets: [baseConfig],
  theme: {
    extend: {
      colors: {
        mybiz: {
          purple: "#4B0082",
          green: "#00FF00",
          grey: "#D3D3D3",
        },
      },
    },
  },
} satisfies Config;
