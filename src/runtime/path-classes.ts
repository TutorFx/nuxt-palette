import type { SeparedPath } from '../types'
import { getSeparatedPaths } from './processor'

class PathSet {
  separedPath: SeparedPath[]
  themeNameSet: string[]
  generalPathsSet: string[]
  constructor(public paths: string[]) {
    this.separedPath = getSeparatedPaths(paths)

    this.themeNameSet = [...new Set(this.separedPath.map(p => p.theme))]
    this.generalPathsSet = [...new Set(this.separedPath.map(p => p.relativePath))]
  }
}

export { PathSet }
