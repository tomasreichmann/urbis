export const parseResources = text => {
  return text.split(/\s*,\s*/).map(resourceText => {
    const match = resourceText.match(
      /\s*(\+?\d+)x?\s+([a-zA-Z\u00C0-\u024F]*)\s*/
    );
    const [, amount, resourceKey] = match;
    return {
      resourceKey,
      amount
    };
  });
};
