import { StoreMutatorIdentifier, StateCreator, create } from 'zustand'

const _map = new Map()

export const createWithKey = <
  T                                              ,
  Mis extends [StoreMutatorIdentifier, unknown][],
  Mos extends [StoreMutatorIdentifier, unknown][],
  U                                              ,
  Key
>(kreator: (key: Key) => StateCreator< T, Mis, Mos, U >) => (key: Key) => {
  if (!_map.has(key)) {
    _map.set(key, create()(kreator(key)))
  }

  return _map.get(key)() as U
}
