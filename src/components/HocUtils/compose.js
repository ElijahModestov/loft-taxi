export const compose = (...functions) => (comp) => {
  return functions.reduceRight((prevResult, func) => func(prevResult), comp);
};