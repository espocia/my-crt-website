export default class History {
  #commands = []
  #index = 0

  //@params command string
  set history(command) {
    if (command === '') return
    this.#commands.push(command)
  }
  get history() {
    return this.#commands[this.#index]
  }

  increment() {
    // console.log('increment', this.#index, this.#commands.length, this.history)
    if (this.#index >= this.#commands.length - 1) return
    this.#index += 1
  }
  decrement() {
    // console.log('decrement', this.#index, this.#commands.length, this.history)
    if (this.#index <= 0) return
    this.#index -= 1
  }
}
