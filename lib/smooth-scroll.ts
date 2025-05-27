export function smoothScrollToSection(sectionId: string, offset = 0) {
  const element = document.getElementById(sectionId)
  if (element) {
    const elementPosition = element.offsetTop - offset
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    })
  }
}
