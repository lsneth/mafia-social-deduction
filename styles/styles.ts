import { StyleSheet } from 'react-native'
import colors from './colors'

const styles = StyleSheet.create({
  // typography
  baseText: { color: colors.white, fontSize: 18 },
  heading: {
    fontSize: 65,
  },
  subheading: {
    fontSize: 25,
  },
  // input
  baseButton: {
    backgroundColor: colors.red,
    paddingTop: 12,
    paddingBottom: 12,
    margin: 7,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 22,
  },
  baseInput: {
    color: colors.white,
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
  paddingBottomMedium: {
    paddingBottom: 40,
  },
})

export default styles
