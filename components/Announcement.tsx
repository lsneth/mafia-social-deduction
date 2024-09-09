import ThemedView from './ThemedView'
import { ThemedText } from './ThemedText'
import ThemedPressable from './ThemedPressable'

export default function Announcement({
  announcementText,
  actionButtonText,
  onActionButtonPress,
  bgImageSrc,
}: {
  announcementText: string
  actionButtonText: string
  onActionButtonPress: () => void
  bgImageSrc: any
}) {
  return (
    <ThemedView bgImageSrc={bgImageSrc} className="justify-between">
      <ThemedText type="title-sm">{announcementText}</ThemedText>
      <ThemedPressable onPress={onActionButtonPress}>
        <ThemedText>{actionButtonText}</ThemedText>
      </ThemedPressable>
    </ThemedView>
  )
}
