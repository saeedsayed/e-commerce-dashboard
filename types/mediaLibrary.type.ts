export interface IFile {
  asset_id: string;
  public_id: string;
  format: string;
  version: number;
  resource_type: string;
  type: string;
  created_at: Date;
  bytes: number;
  width: number;
  height: number;
  asset_folder: string;
  display_name: string;
  url: string;
  secure_url: string;
}

export interface IFolder {
  external_id: string;
  name: string;
  path: string;
}

export interface IFolderWithFiles {
  assets: IFile[];
  folderName: string;
}
