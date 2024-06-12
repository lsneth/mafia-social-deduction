import { useMediaQuery } from 'react-responsive'

export default function useBreakpoints(): { isMobile: boolean } {
  const isMobile = useMediaQuery({
    maxDeviceWidth: 400,
  })

  return { isMobile }
}
