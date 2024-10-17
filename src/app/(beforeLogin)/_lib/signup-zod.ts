import { object, string } from "zod"

export const signUpSchema = object({
	email: string({ required_error: "이메일은 필수입니다." })
		.min(1, "이메일은 필수입니다.")
		.email("이메일 형식이 잘못됐습니다."),
	password: string({ required_error: "비밀번호는 필수입니다." })
		.min(1, "비밀번호는 필수입니다.")
		.min(6, "비밀번호는 6자리 이상 입니다.")
		.max(32, "비밀번호는 32자 이하 입니다."),
	cfPassword: string({ required_error: "비밀번호는 필수입니다." })
		.min(1, "비밀번호는 필수입니다.")
		.min(6, "비밀번호는 6자리 이상 입니다.")
		.max(32, "비밀번호는 32자 이하 입니다."),
})
