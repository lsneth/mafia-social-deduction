import { View } from 'react-native'
import { ThemedText } from './ThemedText'

export default function SummaryTable({
  title,
  sections,
}: {
  title: string
  sections: { component: JSX.Element; bgColor: string }[]
}) {
  return (
    <View className="w-full">
      <View className="items-center rounded-t-lg border-2 border-b-0 border-mafiaDarkGray bg-mafiaBlack p-3">
        <ThemedText>{title}</ThemedText>
      </View>
      <View className="flex flex-row">
        {sections.map((section, index) => (
          <View
            className={`flex-1 items-center ${index === 0 ? 'rounded-bl-lg' : ''} ${index === sections.length - 1 ? 'rounded-br-lg' : ''} ${section.bgColor} p-3`}
            key={section.bgColor}
          >
            {section.component}
          </View>
        ))}
      </View>
    </View>
  )
}
