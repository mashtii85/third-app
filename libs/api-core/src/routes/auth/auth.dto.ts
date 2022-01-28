import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail({ message: 'email must be valid' })
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
