export const createSVG = (firstname: string, lastname: string) => {
  const charOne = firstname.charAt(0).toUpperCase();
  const charTwo = lastname.charAt(0).toUpperCase();
  return `
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="32" fill="#1EB4EB"/>
        <text  x="32" y="41"  text-anchor="middle" font-family="Arial" font-size="24" fill="white">${charOne}${charTwo}</text>
    </svg>
    `;
};
