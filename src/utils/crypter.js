import bcrypt from 'bcryptjs'
export const encrypt = (password) => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

export const compare = (password, hash) => bcrypt.compare(password, hash)
