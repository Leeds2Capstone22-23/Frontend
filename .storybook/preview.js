import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "../src/styling/MainTheme"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const themed = (Story) => (
  <ThemeProvider theme={theme}>
    <CssBaseline>
      <Story />
    </CssBaseline>
  </ThemeProvider>
)

export const decorators = [themed];