export const removePlaceholder = (url: string): string => {
  const regex = new RegExp("{{[a-zA-Z0-9_]*}}", "g");
  return url.replaceAll(regex, "{{}}");
};

export const stripPlaceHolderValues = (url: string): string => {
  return url.replaceAll("{{", "").replaceAll("}}", "");
};
