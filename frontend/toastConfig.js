// toastConfig.js
export const toastOptions = {
  style: {
    background: "#1e3a8a", // dark blue (Tailwind bg-blue-900)
    color: "#ffffff",
    padding: "12px 20px",
    borderRadius: "8px",
    fontWeight: "500",
  },
  success: {
    iconTheme: {
      primary: "#60a5fa", // light blue
      secondary: "#ffffff",
    },
  },
  error: {
    style: {
      background: "#991b1b", // dark red for errors
      color: "#ffffff",
    },
    iconTheme: {
      primary: "#f87171",
      secondary: "#ffffff",
    },
  },
};
