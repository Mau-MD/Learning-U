export const parseObjectToJson = (object: Parse.Object<Parse.Attributes>) => {
  return object.toJSON();
};

export const parseObjectsToJson = (
  objects: Parse.Object<Parse.Attributes>[]
) => {
  return objects.map((object) => object.toJSON());
};
