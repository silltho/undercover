import AgentImage from 'assets/images/roles/agent_town.jpg'
import BeagleBoyImage from 'assets/images/roles/beagleboy_mafia.jpg'
import BodyguardImage from 'assets/images/roles/bodyguard_mafia.jpg'
import ChiefImage from 'assets/images/roles/chief_town.jpg'
import EnforcerImage from 'assets/images/roles/enforcer_mafia.jpg'
import GodfatherImage from 'assets/images/roles/godfather_mafia.jpg'
import OfficerImage from 'assets/images/roles/officer_town.jpg'
import PresidentImage from 'assets/images/roles/president_town.jpg'
import JuniorImage from 'assets/images/roles/junior_anarchists.jpg'

import AgentVideo from 'assets/videos/Agent.mp4'
import BeagleBoyVideo from 'assets/videos/BeagleBoy.mp4'
import BodyguardVideo from 'assets/videos/Bodyguard.mp4'
import ChiefVideo from 'assets/videos/Chief.mp4'
import EnforcerVideo from 'assets/videos/Enforcer.mp4'
import GodfatherVideo from 'assets/videos/Godfather.mp4'
import OfficerVideo from 'assets/videos/Officer.mp4'
import PresidentVideo from 'assets/videos/President.mp4'
import JuniorVideo from 'assets/videos/Junior.mp4'

const RoleVideos = {
  GODFATHER: GodfatherVideo,
  BODYGUARD: BodyguardVideo,
  ENFORCER: EnforcerVideo,
  BEAGLEBOY: BeagleBoyVideo,
  PRESIDENT: PresidentVideo,
  CHIEF: ChiefVideo,
  OFFICER: OfficerVideo,
  AGENT: AgentVideo,
  JUNIOR: JuniorVideo
}

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

export const getVideoByRole = (role = '') => {
  const key = role.replace(/\s+/g, '').toUpperCase()
  return RoleVideos[key]
}