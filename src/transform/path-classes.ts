import { getSeparatedPaths } from '../runtime/processor'
import type { SeparedPath } from '../types'

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
