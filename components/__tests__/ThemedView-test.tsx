import * as React from 'react'
import renderer from 'react-test-renderer'

import { ThemedView } from '../ThemedView'
import { ThemedText } from '../ThemedText'

it(`renders correctly`, () => {
  const tree = renderer
    .create(
      <ThemedView>
        <ThemedText>This is a unit test for the ThemedView component</ThemedText>
      </ThemedView>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
