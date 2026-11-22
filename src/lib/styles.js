// Shared Tailwind class fragments.
//
// `btnLayout` is colors-free on purpose: two utilities targeting the same CSS
// property (bg-*, border-*, text-*) must never both apply to one element,
// because the cascade decides the winner — stylesheet order, not class order.
// Every variant below owns its complete set of color utilities.
const btnLayout =
  "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2";

export const btn = `${btnLayout} border border-line-strong bg-surface text-ink focus-visible:outline-primary`;

export const btnPrimary = `${btnLayout} border border-transparent bg-primary px-5 py-2.5 font-semibold text-white focus-visible:outline-primary hover:bg-primary-dark`;

export const btnDanger = `${btnLayout} border border-transparent bg-danger font-semibold text-white focus-visible:outline-danger hover:bg-danger-dark`;

export const btnCard = `${btnLayout} flex-1 border bg-surface focus-visible:outline-primary`;

export const btnEdit = `${btnCard} border-line-strong text-ink hover:border-navy hover:text-navy`;

export const btnDelete = `${btnCard} border-danger-border text-danger hover:border-danger hover:bg-danger-bg`;

export const btnSolidDanger = `${btnLayout} border border-transparent bg-danger font-semibold text-white focus-visible:outline-danger hover:bg-danger-dark`;

export const fieldInput =
  "w-full rounded-lg border border-line-strong bg-surface px-3 py-2 text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary";

export const fieldLabel = "text-[13px] font-semibold";

export const fieldHelper = "text-xs text-muted";

export const fieldHelperError = "text-xs text-danger";

export const modalOverlay = "fixed inset-0 grid place-items-center overflow-y-auto bg-slate-900/35 p-6";

export const modalPanel = "w-full max-w-[26rem] rounded-xl bg-surface p-5 shadow-2xl";

export const modalTitle = "mb-0.5 text-[17px] leading-tight font-semibold";

export const modalSubtitle = "m-0 text-[13px] text-muted";

export const modalClose =
  "grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-md border-0 bg-transparent text-lg leading-none text-muted hover:bg-page hover:text-ink";
