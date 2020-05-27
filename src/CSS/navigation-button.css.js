export const navButtonStyle = {
    color: "CornflowerBlue",
    decoration: "none",
    border: "none",
    background: "none",
    outline: "none",
    textAlign: "left",
    padding: "5px",
    cursor: "pointer"
};

export const selectedNavButtonStyle = {
    ...navButtonStyle,
    color: "#00BFFF",
    textDecoration: "underline"
};

export const hoveredNavButtonStyle = {
    ...navButtonStyle,
    backgroundColor: "rgba(80, 80, 80, 0.5)"
}