import Spacer from '@/components/Spacer'
import { ThemedText } from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import { ScrollView, Text } from 'react-native'

function ItalicText({ children }: { children: string }) {
  return <Text style={{ fontStyle: 'italic' }}>{children}</Text>
}

export default function Rules() {
  return (
    <ThemedView>
      <ScrollView>
        <ThemedText type="title-sm">Introduction</ThemedText>
        <Spacer />
        <ThemedText align="left">
          <ItalicText>Mafia: Social Deduction</ItalicText> is a classic game of deception, strategy, and discernment.
          Players must navigate lies, alliances, and accusations to uncover the truth. As trust is tested and strategies
          evolve, the tension rises, making each game more nuanced and enjoyable the more you play.
        </ThemedText>
        <Spacer size={3} />

        <ThemedText align="left">
          What’s great about this version is that you don’t have to worry about managing the game. It assigns roles,
          moderates the action, and runs entirely on its own. All you have to do is enjoy! While the game can
          theoretically be played online with no real interaction, it's designed for players to be in the same room or,
          at the very least, on the same video call.
        </ThemedText>
        <Spacer size={8} />

        <ThemedText type="title-sm">Objective</ThemedText>
        <Spacer />
        <ThemedText align="left">
          <ItalicText>Mafia</ItalicText> has two teams: the Mafia team (comprised of the mafia members) and the Innocent
          team (made up of innocents and investigators). The Mafia team wins when the living mafia members outnumber the
          remaining innocents. The Innocent team wins once all mafia members are eliminated.
        </ThemedText>
        <Spacer size={8} />

        <ThemedText type="title-sm">Gameplay</ThemedText>
        <Spacer />
        <ThemedText align="left">
          The game begins in the player lobby, where you'll see the breakdown of roles based on the number of players.
        </ThemedText>
        <Spacer size={3} />

        <ThemedText align="left">
          Once the host starts the game, you'll be randomly assigned a role. Take a moment to read the details of your
          role, but don’t worry—you’ll be able to review this later.
        </ThemedText>
        <Spacer size={3} />

        <ThemedText align="left">
          When all players have viewed their roles, the first night begins. The Mafia team decides together who to
          murder. If there’s a disagreement, the majority vote determines the target, with no ties allowed.
        </ThemedText>
        <Spacer size={3} />

        <ThemedText align="left">
          After the Mafia has selected their victim, the first day begins. Everyone will be informed of who was murdered
          and what that player's role was. They are now out of the game and may no longer speak, vote, or participate.
        </ThemedText>
        <Spacer size={3} />

        <ThemedText align="left">
          The day phase is all about discussion and deduction. You can ask questions, accuse others, or defend
          yourself—whether truthfully or with lies. There’s no set structure for the conversation, but eventually, the
          group must vote on who to execute for murder.
        </ThemedText>
        <Spacer size={3} />

        <ThemedText align="left">
          Once votes are cast, the executed player is announced and their role revealed. Like the murdered player, they
          may no longer participate.
        </ThemedText>
        <Spacer size={3} />

        <ThemedText align="left">
          Night falls again. This time, after the Mafia chooses their next victim, the Investigators will decide who to
          investigate. Again, the majority choice prevails, with no ties allowed. The Investigators will then learn if
          their chosen player is a mafia member.
        </ThemedText>
        <Spacer size={3} />

        <ThemedText align="left">
          The cycle of day and night repeats until one of the two win conditions is met: the Mafia outnumber the
          innocents, or all mafia members are dead.
        </ThemedText>
      </ScrollView>
    </ThemedView>
  )
}
