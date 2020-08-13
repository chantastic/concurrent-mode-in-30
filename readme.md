## GOALS

- What and why is it?
- "boundary"
- "fallback"
- "transition"
- `Suspense` and `SuspenseList`
- How it impacts components

## NEW APIs

[docs](https://reactjs.org/docs/concurrent-mode-reference.html#usedeferredvalue)

- [`createRoot`](https://reactjs.org/docs/concurrent-mode-reference.html#createroot)
- [`createBlockingRoot`](https://reactjs.org/docs/concurrent-mode-reference.html#createblockingroot)
- [`Suspense`](https://reactjs.org/docs/concurrent-mode-reference.html#suspensecomponent)
  - `fallback`
- [`SuspenseList`](https://reactjs.org/docs/concurrent-mode-reference.html#suspenselist)
  - `revealOrder`: `forwards|backwards|together`
- [`useTransition`](https://reactjs.org/docs/concurrent-mode-reference.html#usetransition)
- [`useDeferredValue`](https://reactjs.org/docs/concurrent-mode-reference.html#usedeferredvalue)

## Lessons

### 1. Import `PokemonDetail` dynamically

- Use dynamic `import()` to import the `PokemonDetail` module
- Wrap it in `React.lazy` so `React.Suspense` knows what to do with it
- The app breaks because it loads with the component it needs to render. this means it's working

### 2. Catch async errors with an `ErrorBoundary`

- Use an [error boundary component](https://reactjs.org/docs/error-boundaries.html) to catch errors and provide a fallback
- Now, read and fix the error!

### 3. Wrap in `React.Suspense` boundary with fallback

- Add a `React.Suspense` component around async component
- Provide a fallback prop with any renderable `fallback={<div>...fetching pokemon</div>}`

### 4. Wrap promised data in suspensify

- As an experiment, wrap the `initialPokemon` object in a `Promise.resolve`
- Like `React.lazy`, promises need a wrapper to communicate with `Suspense` boundaries. Import the small `suspensify` utility into the app. `import { suspensify } from "./api";`
- Wrap our `initialPokemon` resolved promise in `suspensify`
- Call the `read()` function in the consuming component (`PokemonDetail`)

Play with all the options...

- `promise.resolve({ ... })`
- `Promise.reject()`
- `new Promise(() => {})`
- `fetchPokemon(1)`

- Finally, use `fetchPokemon` (also provided as a named export from `api.js`)

### 5. Put `initialPokemon` in state, so can update it

- `let [pokemon] = React.useState(initialPokemon)`
- Note that we're putting the whole pokemon here, not just the number
- Note also that the `useState` hook is totally fine holding an unresolved promise

### 6. Create a button to fetch the next pokemon

- Take the updater function from `useState`
  - `let [pokemon, updatePokemon] = React.useState(initialPokemon);`
- ...`updatePokemon(suspensify(updatePokemon(2)))`

### 7. Make the button dynamic

- Try `suspensify(updatePokemon(pokemon.id + 1))`
- It doesn't work because `pokemon` isn't a resolved value in this scope
- we can only use it where the component calls `.read()`. remember .read()?
- this will impact how you write code.
- let's update the component and then teach it some composability
- - (we have a short ammount of time so i'll show you how i solved it)
- - (move the button in first.)

### 8. `useTransition`

- startTransition w/timeout to set how long until flash off fallback
- unstable_createRoot to turn it on
- isPending to show some loading state
- isPending to show change color to gray
  (1. useDeferredValue _but_ short on time)

### 9. More Suspense boundaries

- use oversimplified PokemonList componenent that does all of it's own data-fetching
- we're slowing this call down to 2 seconds
- if we put it in the same error boundary, they load together
- we can do better. we'd like to load the first available
- use different suspense boundaries
- we can still do layout

### 10. `SuspenseList`

- `revealOrder: "forwards" | "backwards" | "together"`
- `tail: "collapsed" | "hidden"`
