export const handleStyleGradient = (index) => {
  switch (index) {
    case 0:
      return "bg-virtual-gradient-webkit bg-virtual-gradient";
    case 1:
      return "bg-date-gradient-webkit bg-date-gradient";
    case 2:
      return "bg-work-gradient-webkit bg-work-gradient";
    case 3:
      return "bg-read-gradient-webkit bg-read-gradient";
    case 4:
      return "bg-chill-gradient-webkit bg-chill-gradient";
  }
};

export const handleInnerHeightSlides = (height) => {
  if (height > 0 && height < 768) return 1;
  else if (height >= 768 && height < 998) return 2;
  else return 3;
};
export const handleInnerHeightConvenient = (height, len) => {
  if (len < 4) return len;
  if (height > 0 && height < 998) return 4;
  else return 5;
};

export const handleInnerHeightArea = (height) => {
  if (height > 0 && height < 768) return 2;
  else if (height >= 768 && height < 998) return 3;
  else return 4;
};

export const getLocalStorage = (name) => {
  if (!localStorage.getItem(name) || localStorage.getItem(name) === "undefined")
    return null;
  return JSON.parse(localStorage.getItem(name));
};

export const setLocalStorage = (name, value) => {
  return localStorage.setItem(name, JSON.stringify(value));
};

export const removeLocalStorage = (name) => {
  return localStorage.removeItem(name);
};

export const handleTransformStringToDate = (transformString) => {
  if (!transformString.length === 0) return false;
  const start = transformString.split("-")[0];

  const end = transformString.split("-")[1];
  const date = new Date();
  const hoursCurr = date.getHours();
  const minutesCurr = date.getMinutes();
  const startHours = start.split(":")[0];
  const startMinutes = start.split(":")[1];
  const endHours = end.split(":")[0];
  const endMinutes = end.split(":")[1];

  if (
    hoursCurr < startHours ||
    (hoursCurr === endHours && minutesCurr > endMinutes) ||
    hoursCurr > endHours ||
    (hoursCurr === startHours && minutesCurr < startMinutes)
  )
    return false;

  return true;
};
