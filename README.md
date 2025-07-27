# HAPPY-CREATE
*happy-create* is a lightweight Zustand `create` wrapper library that enables creating multiple independent stores using keys.

## Installation
```sh
bun add happy-create
```

## Usage
```tsx
import { createWithKey } from 'happy-create'

type CntStore = {
  key  : string
  value: number

  inc: () => void
}

const useCntStore = createWithKey< CntStore >()((key: string) =>
  (set, get) => ({
    key     ,
    value: 1,

    inc: () => set({ value: get().value + 1 })
  })
)

export const App = () => {
  const {
    key  : key0  ,
    value: value0,
    inc  : inc0
  } = useCntStore('Lucy')

  const {
    key  : key1  ,
    value: value1,
    inc  : inc1
  } = useCntStore('David')

  return (
    <div>
      <button onClick = { inc0 }>Increase { key0 }: { value0 }</button>
      <br/>
      <button onClick = { inc1 }>Increase { key1 }: { value1 }</button>
    </div>
  )
}
```

## With Middlewares
```typescript
import { createWithKey  } from 'happy-create'
import { createComputed } from 'zustand-computed'

type CntStore = {
  key  : string
  value: number

  inc: () => void
}

const computed = createComputed((state: CntStore) => ({
  valueSquare: state.value ** 2,
}))

const useKeyCntStore = createWithKey()((key: string) =>
  computed(
    (set, get) => ({
      key     ,
      value: 1,

      inc: () => set({ value: get().value + 1 })
    })
  )
)
```
