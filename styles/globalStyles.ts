import { StyleSheet } from 'react-native'
import colors from './colors'

const globalStyles = StyleSheet.create({
  // typography
  baseText: { color: colors.white, fontSize: 16 },
  heading: {
    fontSize: 65,
  },
  subheading: {
    fontSize: 25,
  },
  // input
  baseTextInputContainer: {
    marginLeft: 25,
    marginRight: 25,
  },
  baseTextInput: {
    color: colors.white,
    borderWidth: 1,
    borderRadius: 22,
    backgroundColor: colors.gray,
    padding: 8,
    paddingLeft: 16,
    marginTop: 5,
    marginBottom: 5,
  },
  // alignment
  center: { textAlign: 'center' },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  // spacing
  paddingLarge: {
    padding: 70,
  },
  paddingTopMedium: {
    paddingTop: 40,
  },
  paddingBottomMedium: {
    paddingBottom: 40,
  },
})

export default globalStyles
