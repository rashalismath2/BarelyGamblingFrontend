
export class UpdateUserDto{
    public UserId:string;
    public FirstName:string;
    public LastName:string;
    public NewPassword:string;
    public OldPassword:string;
    public ProfilePicture:File
    public passwordChangeRequest:boolean;
    public profilePictureChangeRequest:boolean;
}