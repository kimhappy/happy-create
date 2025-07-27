import { StoreMutatorIdentifier, create } from 'zustand'

type _AddKey< Creator, Key > = Creator extends (...args: infer P) => infer R ? (key: Key, ...args: P) => R : never

const _map = new Map()

export const createWithKey = <
  Store                                                   ,
  Key                                             = string,
  Mos extends [StoreMutatorIdentifier, unknown][] = []
>(kreator: _AddKey< Parameters< typeof create< Store, Mos > >[ 0 ], Key >) => (key: Key) => {
  if (!_map.has(key)) {
    _map.set(key, create< Store, Mos >((set, get, api) => kreator(key, set, get, api)))
  }

  return _map.get(key)() as Store
}
