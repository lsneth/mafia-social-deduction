import React, { useEffect, useState } from 'react'
import ParentView from '../components/ParentView'
import Text from '../components/Text'
import BottomView from '../components/BottomView'
export default function Night() {
  const [dotCount, setDotCount] = useState<1 | 2 | 3>(1)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDotCount((prev) => ((prev % 3) + 1) as 1 | 2 | 3)
    }, 700)

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, [])

  return (
    <ParentView
      backgroundImage={require('../../assets/images/night.png')}
      gradientValues={['#000000', 'transparent', 'transparent']}
    >
      <Text size="lg">Night</Text>
      <BottomView>
        {dotCount === 1 ? (
          <Text size="lg">.</Text>
        ) : dotCount === 2 ? (
          <Text size="lg">..</Text>
        ) : (
          <Text size="lg">...</Text>
        )}
      </BottomView>
    </ParentView>
  )
}
