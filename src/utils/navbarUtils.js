export const buildDropdownItems = (role, navigate, handleLogout) => [
  ...(role === "Admin"
    ? [{ label: "Admin", onClick: () => navigate("/admin") }]
    : []),
  { label: "Profile", onClick: () => navigate("/profile") },
  { label: "Your Picks", onClick: () => navigate("/yourPicks") },
  { type: "divider" },
  { label: "Logout", onClick: handleLogout },
];