export interface IFile {
    fileUrl:   string;
    publicId:  string;
    _id:       string;
    createdAt: Date;
}

export interface IFolder {
    _id:         string;
    folderTitle: string;
    createdAt:   Date;
    updatedAt:   Date;
}

export interface IFolderWithFiles extends IFolder {
    files: IFile[];
}
