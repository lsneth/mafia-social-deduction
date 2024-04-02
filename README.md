# Mafia: Social Deduction

## Purpose

I've always really enjoyed the social deduction genre. Games like [The Resistance](https://boardgamegeek.com/boardgame/41114/resistance), [Salem 1692](https://boardgamegeek.com/boardgame/175549/salem-1692), and [Secret Hitler](https://boardgamegeek.com/boardgame/188834/secret-hitler) just never get old for me. In my opinion, the biggest problem with the genre in general is the logistics. You have to have a moderator, the moderator has to be unbiased and not give anything away, cards and movement make noise when reaching across the table at night, it's easy to accidentally drop a card when passing out the roles and then you have to re-deal, etc.

This app will take away all of that and shave the game down as close as possible to a pure social deduction experience. Obviously the most classic social deduction game is mafia (or werewolf). Everyone loves it, but it isn't necessarily the most fun. This app will serve as a template, stepping stool, or first trial at developing an easy, seamless social deduction experience that can be built off of to develop more involved social deduction games in the future.

## Stack

The front-end of _Mafia: Social Deduction_ is written in [TypeScript](https://www.typescriptlang.org/) using the [React Native](https://reactnative.dev/) framework and the back-end is built in [Supabase](https://supabase.com/). Data such as player stats and user info are stored in Supabase tables, while in-game state is tracked and shared over WebSockets, made simple with Supabase's [realtime](https://supabase.com/docs/guides/realtime) database functionality provided through their [JavaScript Client Library](https://supabase.com/docs/reference/javascript/installing).

## Future Plans

### 1. Minimum Viable Product

- Finish the in-game experience
  - In-game role viewer
  - In-game history viewer

### 2. App Store and Play Store Deployment

### 3. Feature Development

- Track player stats and provide a way to view them
  - wins/losses
  - wins/losses by role
  - total games played
  - total games played by role
  - total votes for/against
  - number of times you've been murdered
  - number of times you've been voted to be hung
  - number of times you've been investigated
  - number of times you've finished the game alive
  - etc
- Create and develop more role options

### 4. Repeat the Process with Other Games

I have some ideas for some really cool (_I_ think) original social deduction games. This app will be a large building block in developing those in the future.
