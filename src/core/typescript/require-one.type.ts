/**
 * Makes an interface with all optional values to require AT LEAST one of them.
 */
export type RequireAtLeastOne<T, TKeys extends keyof T = keyof T> = Pick<
T,
Exclude<keyof T, TKeys>
> &
{
  [K in TKeys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<TKeys, K>>>;
}[TKeys];

/* Makes an interface with all optional values to accept ONLY one of them */
export type RequireOnlyOne<T, TKeys extends keyof T = keyof T> = Pick<
T,
Exclude<keyof T, TKeys>
> &
{
  [K in TKeys]-?: Required<Pick<T, K>> &
  Partial<Record<Exclude<TKeys, K>, undefined>>;
}[TKeys];
