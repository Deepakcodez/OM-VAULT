import { ipcMain } from "electron"
import bcrypt from 'bcryptjs'
import { doesAnyUserExist, getAllUsers, getUserByEmail, insertUser } from "../../services/user.services"

export const AuthHandler = () => {

    ipcMain.handle('addUser', async (_, userData) => {
        console.log('from main process user data', userData)

        try {
          // Hash the password with salt rounds (10 is a good default)
          const hashedPassword = await bcrypt.hash(userData.password, 10)

          // Replace plain password with hashed one
          const userWithHashedPassword = { ...userData, password: hashedPassword }

          // Insert user into the database
          insertUser(userWithHashedPassword)

          return { success: true, message: 'User added successfully' }
        } catch (error) {
          console.error('Error hashing password:', error)
          return { success: false, message: 'Failed to add user' }
        }
      })

      ipcMain.handle('loginUser', async (_, { email, password }) => {
        try {
          // Fetch user from the database based on email
          const user = getUserByEmail(email)

          if (!user) {
            return { success: false, message: 'User not found', isAuthenticated: false }
          }

          // Compare the entered password with the stored hashed password
          const isPasswordValid = await bcrypt.compare(password, user.password)

          if (!isPasswordValid) {
            return { success: false, message: 'Invalid email or password', isAuthenticated: false }
          }

          return { success: true, message: 'Login successful', isAuthenticated: true, user }
        } catch (error) {
          console.error('Login error:', error)
          return { success: false, message: 'Something went wrong', isAuthenticated: false }
        }
      })

      ipcMain.handle('getAllUsers', () => {
        console.log('from main process get all users')
        return getAllUsers()
      })

      ipcMain.handle('doesAnyUserExist', () => {
        console.log('from main process doesAnyUserExist')
        return doesAnyUserExist()
      })
}
