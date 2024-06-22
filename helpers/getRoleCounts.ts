export default function getRoleCounts(playerCount: number) {
  const mafiaCount = playerCount <= 4 ? 0 : playerCount <= 6 ? 1 : playerCount <= 11 ? 2 : 3
  const investigatorCount = playerCount <= 4 ? 0 : playerCount <= 11 ? 1 : 2
  const innocentCount = playerCount - mafiaCount - investigatorCount

  return { mafiaCount, investigatorCount, innocentCount }
}
