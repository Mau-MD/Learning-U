import Parse from "Parse/node";

export interface DbObject {
  objectId: string;
  updatedAt: string;
  createdAt: string;
  ACL: object;
}

export type ParseJson = Parse.Object.ToJSON<Parse.Attributes> &
  Parse.JSONBaseAttributes;
