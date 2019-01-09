import teamFinder from 'team-finder'

const teams = teamFinder.getAllTeams()
const teamNames = Object.keys(teams).map(team => teams[team].fullName)

export function findAcronymMatch(acronym) {
  return teamNames.filter(team => {
    const firstLetter = acronym.charAt(0).toUpperCase()
    return (
      team.indexOf(firstLetter) === 0 &&
      isConsecutiveCharMatch(acronym.toUpperCase(), team.toUpperCase())
    )
  })
}

/**
 * Searches for a consecutive char match from "term" in "text"
 *
 * for example: isConsecutiveCharMatch("VCR", "VANCOUVER") will return true because the characters 'V', 'C', 'R' appear in that order for "VANCOUVER"
 */
export function isConsecutiveCharMatch(
  term,
  text,
  currentTermIndex = 0,
  currentTextIndex = 0
) {
  if (currentTermIndex > term.length - 1) {
    return true
  }

  const termChar = term.charAt(currentTermIndex)
  const slicedText = text.slice(currentTextIndex)
  const textMatchIndex = slicedText.indexOf(termChar) + currentTextIndex

  return currentTextIndex < text.length - 1
    ? textMatchIndex >= currentTextIndex &&
        isConsecutiveCharMatch(
          term,
          text,
          currentTermIndex + 1,
          textMatchIndex + 1
        )
    : false
}
