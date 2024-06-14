import { TailwindSize } from '@/types/TailwindSize'
import { View } from 'react-native'

export default function Spacer({ size = 1 }: { size?: TailwindSize }) {
  const styleMap = {
    0.5: 'py-0.5',
    1: 'py-1',
    1.5: 'py-1.5',
    2: 'py-2',
    2.5: 'py-2.5',
    3: 'py-3',
    3.5: 'py-3.5',
    4: 'py-4',
    5: 'py-5',
    6: 'py-6',
    7: 'py-7',
    8: 'py-8',
    9: 'py-9',
    10: 'py-10',
    11: 'py-11',
    12: 'py-12',
    14: 'py-14',
    16: 'py-16',
    20: 'py-20',
    24: 'py-24',
    28: 'py-28',
    32: 'py-32',
    36: 'py-36',
    40: 'py-40',
    44: 'py-44',
    48: 'py-48',
    52: 'py-52',
    56: 'py-56',
    60: 'py-60',
    64: 'py-64',
    72: 'py-72',
    80: 'py-80',
    96: 'py-96',
  }

  return <View className={styleMap[size]} />
}
