export type AttributeValue = string | Date | boolean | number;

export type AddRemove<T extends AttributeValue> = {
  add?: T[];
  remove?: T[];
};
type BrazeCustomAttribute = AttributeValue | AttributeValue[] | AddRemove<AttributeValue>;

type BrazeCustomAttributes = {
  [customAttribute: string]: BrazeCustomAttribute;
}

export type BrazeUserProfileFields = {
  first_name?: string;
  email?: string;
};

export type BrazeUserAttributesObject = Partial<BrazeUserProfileFields> & BrazeCustomAttributes & {
  // One of "external_id" or "user_alias" or "braze_id" is required

  // (optional, string) see External User ID,
  external_id?: string;

  // (optional, User Alias Object),
  user_alias?: unknown;

  // (optional, string) Braze User Identifier,
  braze_id?: string;

  // Setting this flag to true will put the API in "Update Only" mode.
  // When using a "user_alias", "Update Only" defaults to true.
  // (optional, boolean),
  _update_existing_only?: boolean;

  // (optional, boolean),
  push_token_import?: boolean;
};


export type BrazeTrackRequest = {
  attributes?: BrazeUserAttributesObject[];
  events?: unknown[];
  purchases?: unknown[];
};

export type BrazeTrackResponse = {
  message: string;
  attributes_processed?: number;
  events_processed?: number;
  purchases_processed?: number;
};