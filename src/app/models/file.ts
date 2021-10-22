export interface FileResponse {
  id: string
  name: string
  timestamp: Date
  extension: string
  size: number
  fileID: string
  hidden: boolean
}

export interface File {
  id: string
  name: string
  timestamp: Date
  extension: string
  size: number
  fileID: string
  url: string
  selected: boolean
  hidden: boolean
}
