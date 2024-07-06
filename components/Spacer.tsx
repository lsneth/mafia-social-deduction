import { TailwindSize } from '@/types/tailwind-types'
import { View } from 'react-native'

export default function Spacer({ size = 2 }: { size?: TailwindSize }) {
  const styleMap = {
    0.5: 'pt-0.5',
    1: 'pt-1',
    1.5: 'pt-1.5',
    2: 'pt-2',
    2.5: 'pt-2.5',
    3: 'pt-3',
    3.5: 'pt-3.5',
    4: 'pt-4',
    5: 'pt-5',
    6: 'pt-6',
    7: 'pt-7',
    8: 'pt-8',
    9: 'pt-9',
    10: 'pt-10',
    11: 'pt-11',
    12: 'pt-12',
    14: 'pt-14',
    16: 'pt-16',
    20: 'pt-20',
    24: 'pt-24',
    28: 'pt-28',
    32: 'pt-32',
    36: 'pt-36',
    40: 'pt-40',
    44: 'pt-44',
    48: 'pt-48',
    52: 'pt-52',
    56: 'pt-56',
    60: 'pt-60',
    64: 'pt-64',
    72: 'pt-72',
    80: 'pt-80',
    96: 'pt-96',
  }

  return <View className={styleMap[size]} />
}
