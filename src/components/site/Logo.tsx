import { Icon } from "@/components/icons/Sprite";
import { SectionLink } from "./SectionLink";

/** IMP(O)RTNOW wordmark; the O is the arrow-into-ring mark. Always links to the top of the home page. */
export function Logo() {
  return (
    <SectionLink section="home" className="logo" aria-label="ImportNow home">
      IMP
      <Icon name="logo-o" />
      RTNOW
    </SectionLink>
  );
}
