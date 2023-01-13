const isObject = (obj: unknown): boolean => typeof obj === 'object' && obj !== null && !Array.isArray(obj);

const isEmptyObject = (obj: unknown): boolean => typeof obj === 'object' && obj !== null && !Object.keys(obj).length;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const stripEmptyObjects = (obj: Record<string, unknown>): unknown => {
  const cleanObj: Record<string, unknown> = obj;

  if (!isObject(obj) && !Array.isArray(cleanObj)) {
    return cleanObj;
  }
  if (obj === null) {
    return undefined;
  }

  if (!Array.isArray(cleanObj)) {
    // eslint-disable-next-line no-restricted-syntax
    Object.keys(cleanObj).forEach((key) => {
      let value = cleanObj[key];

      if (typeof value === 'object' && value !== null) {
        value = stripEmptyObjects(value as Record<string, unknown>);

        if (isEmptyObject(value)) {
          delete cleanObj[key];
        }
        else {
          cleanObj[key] = value;
        }
      }
      else if (value === null) {
        // Null properties in an object should remain!
      }
    });

    return cleanObj;
  }

  // eslint-disable-next-line no-restricted-syntax
  cleanObj.forEach((o, idx) => {
    let value = o;
    if (typeof value === 'object' && value !== null) {
      value = stripEmptyObjects(value);

      if (isEmptyObject(value)) {
        delete cleanObj[idx];
      }
      else {
        cleanObj[idx] = value;
      }
    }
    else if (value === null) {
      // Null entries within an array should be removed.
      delete cleanObj[idx];
    }
  });

  // Since deleting a key from an array will retain an undefined value in that array, we need to
  // filter them out.
  return cleanObj.filter((el) => el !== undefined);
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const removeUndefinedProps = (obj?: unknown) => {
  if (obj === undefined) {
    return undefined;
  }

  // JSON.stringify removes undefined values. Though `[undefined]` will be converted with this to
  // `[null]`, we'll clean that up next.
  let withoutUndefined = JSON.parse(JSON.stringify(obj));

  // Then we recursively remove all empty objects and nullish arrays.
  withoutUndefined = stripEmptyObjects(withoutUndefined);

  // If the only thing that's leftover is an empty object then return nothing.
  if (isEmptyObject(withoutUndefined)) {
    return undefined;
  }

  return withoutUndefined;
};
