import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail({ message: 'Enter a valid email' })
  email: string

  @IsString()
  @IsNotEmpty({ message: "password shouldn't be empty" })
  password: string
}

export class SwitchAccountDto {
  @IsNumber()
  @IsNotEmpty()
  accountId: string
}
