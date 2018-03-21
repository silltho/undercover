import AgentImage from 'assets/images/roles/agent_town.jpg'
import BeagleBoyImage from 'assets/images/roles/beagleboy_mafia.jpg'
import BodyguardImage from 'assets/images/roles/bodyguards_mafia.jpg'
import ChiefImage from 'assets/images/roles/chief_town.jpg'
import EnforcerImage from 'assets/images/roles/enforcer_mafia.jpg'
import GodfatherImage from 'assets/images/roles/godfather_mafia.jpg'
import OfficerImage from 'assets/images/roles/officer_town.jpg'
import PresidentImage from 'assets/images/roles/president_town.jpg'
import JuniorImage from 'assets/images/roles/junior_anarchists.jpg'

const RoleImages = {
  GODFATHER: GodfatherImage,
  BODYGUARD: BodyguardImage,
  ENFORCER: EnforcerImage,
  BEAGLEBOY: BeagleBoyImage,
  PRESIDENT: PresidentImage,
  CHIEF: ChiefImage,
  OFFICER: OfficerImage,
  AGENT: AgentImage,
  JUNIOR: JuniorImage
}

export const getImageByRole = (role = '') => {
  const key = role.replace(/\s+/g, '').toUpperCase()
  return RoleImages[key]
}