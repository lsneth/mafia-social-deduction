import * as React from 'react'
import renderer from 'react-test-renderer'

import { ThemedText } from '../ThemedText'

it(`renders correctly`, () => {
  const tree = renderer.create(<ThemedText>This is a unit test for the ThemedText component</ThemedText>).toJSON()

  expect(tree).toMatchSnapshot()
})
