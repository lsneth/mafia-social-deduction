import * as React from 'react'
import renderer from 'react-test-renderer'

import { ThemedPressable } from '../ThemedPressable'

it(`renders correctly`, () => {
  const tree = renderer
    .create(<ThemedPressable>This is a unit test for the ThemedPressable component</ThemedPressable>)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
