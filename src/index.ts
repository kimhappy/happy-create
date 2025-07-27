import { StoreMutatorIdentifier, StateCreator, create } from 'zustand'

const _map = new Map()

export const createWithKey = <
  Store                                                   ,
  Key                                             = string,
  Mis extends [StoreMutatorIdentifier, unknown][] = []    ,
  Mos extends [StoreMutatorIdentifier, unknown][] = []    ,
>(kreator: (key: Key) => StateCreator< Store, Mis, Mos >) => (key: Key) => {
  if (!_map.has(key)) {
    _map.set(key, create< Store >()(kreator(key)))
  }

  return _map.get(key)() as Store
}
