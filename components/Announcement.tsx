import { ThemedText } from './ThemedText'
import ThemedPressable from './ThemedPressable'

export default function Announcement({
  announcementTitle,
  announcementSubtitle,
  actionButtonText,
  onActionButtonPress,
}: {
  announcementTitle: string
  announcementSubtitle?: string
  actionButtonText: string
  onActionButtonPress: () => void
}) {
  return (
    <>
      <ThemedText type="title-sm">{announcementTitle}</ThemedText>
      {announcementSubtitle ? <ThemedText type="default">{announcementSubtitle}</ThemedText> : null}
      <ThemedPressable onPress={onActionButtonPress}>
        <ThemedText>{actionButtonText}</ThemedText>
      </ThemedPressable>
    </>
  )
}
