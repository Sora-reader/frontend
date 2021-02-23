export type OverridableComponentMock = {
  // A workaround to have hints while having the ability
  // to pass other props
  classes?: Record<"root", string>,
  value?: number | null,
  component?: string,
}