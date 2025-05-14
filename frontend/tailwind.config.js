module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "3rem",
        "2xl": "100px",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      spacing: {
        "full-outside": "calc(100vw - (100vw - 100%))",
      },
      zIndex: {
        100: "100",
      },
      backgroundImage: {
        "plan-pattern": "url('public/photos/plan_back.png')",
      },
      fontFamily: {
        sans: ["YFF Rare", "sans-serif"],
      },
      animation: {
        marquee: "marquee 20s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      colors: {
        background: "#FAFAF9",
        text: "#171717",
        primary: "#0C3281",
      },
      fontSize: {
        "24px": "1.5rem",
        "30px": "1.875rem",
        "36px": "2.25rem",
        "42px": "2.625rem",
        "60px": "3.75rem",
        "90px": "5.625rem",
        giant: "10rem",
      },
      spacing: {
        screen: "100vw",
        90: "5.625rem",
        128: "32rem",
        12: "3rem",
        16: "4rem",
        10: "2.5rem",
      },
      borderWidth: {
        3: "3px",
        4: "4px",
        5: "5px",
        6: "6px",
      },
      minWidth: {
        max: "max-content",
      },
    },
  },
  corePlugins: {
    boxSizing: true,
  },
};
