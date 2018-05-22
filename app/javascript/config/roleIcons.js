import { ICONS } from 'components/IconFont'

export const ACTIVE_ICONS = {
  GODFATHER: ICONS.corrupt,
  BODYGUARD: ICONS.beat,
  ENFORCER: ICONS.kill,
  BEAGLEBOY: ICONS.keys,
  PRESIDENT: ICONS.convert,
  CHIEF: ICONS.handcuffs,
  OFFICER: ICONS.handcuffs,
  AGENT: ICONS.goggles,
  ANARCHIST: ICONS.poison
}

export const getActiveIconByRole = (role = '') => {
  const key = role.replace(/\s+/g, '').toUpperCase()
  return ACTIVE_ICONS[key]
}
