export const removePlaceholder = (url: string): string => {
  const regex = new RegExp("{{[a-zA-Z0-9_]*}}", "g");
  console.log(regex.test(url));
  return url.replaceAll(regex, "{{}}");
};
