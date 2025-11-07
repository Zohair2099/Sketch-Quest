import * as React from "react"
import { useSettings } from "@/context/settings-context"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const { settings } = useSettings();
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    if (settings.viewMode === 'mobile') {
      setIsMobile(true);
      return;
    }
    if (settings.viewMode === 'desktop') {
      setIsMobile(false);
      return;
    }

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [settings.viewMode])

  return !!isMobile
}
