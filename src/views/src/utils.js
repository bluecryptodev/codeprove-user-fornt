export const getDisplayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component"
}

export const makeOneToOneRoomId = (idA, idB) => {
  if (idB > idA) {
    const temp = idA
    idA = idB
    idB = temp
  }
  console.log(`${btoa(idA)}-${btoa(idB)}`)
  return `${btoa(idA)}-${btoa(idB)}`
}
