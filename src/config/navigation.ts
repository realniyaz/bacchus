export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: "The Sanctuary", href: "/" },
  { label: "The Vault", href: "/the-vault" },
  { label: "The Craft", href: "/the-craft" },
  { label: "Kinetic Line", href: "/kinetic-editions", badge: "New" },
  { label: "The Society", href: "/the-society" },
  { label: "Stockists", href: "/stockists" },
];

export const FOOTER_SECTIONS = [
  {
    title: "The Portfolio",
    links: [
      { label: "Talsons' Reserve 12Y", href: "/the-vault#talsons-reserve-12" },
      { label: "Jackie's Crown Whisky", href: "/the-vault#jackies-crown" },
      { label: "Crazy Boxer Spirit", href: "/kinetic-editions" },
      { label: "Private Cask Allocations", href: "/the-society" },
    ],
  },
  {
    title: "Distillery & Craft",
    links: [
      { label: "Heritage Since 1994", href: "/the-craft" },
      { label: "Double Wood Maturation", href: "/the-craft#double-wood" },
      { label: "Copper Pot Stills", href: "/the-craft#distillation" },
      { label: "Master Tasting Archive", href: "/the-vault" },
    ],
  },
  {
    title: "Bacchus Society",
    links: [
      { label: "VIP Cellar Register", href: "/the-society#register" },
      { label: "Speakeasy Locator", href: "/stockists" },
      { label: "Private Concierge", href: "/the-society#concierge" },
      { label: "Press & Wholesale Inquiries", href: "/contact" },
    ],
  },
];