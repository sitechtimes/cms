// made by the great lord Emerson Yang for destructuring long returns (backdoor btw)
function unpack<T extends object>(obj: T): T {
  return obj
}

export default unpack
