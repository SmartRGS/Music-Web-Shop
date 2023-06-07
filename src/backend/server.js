const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const connectionString =
  'mongodb+srv://M4aXim:Maksim.12356@cluster0.yc7skld.mongodb.net/test?retryWrites=true&w=majority';

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log(err));

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String, default: '' },
});

const User = mongoose.model('User', UserSchema);

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ success: false, error: 'Invalid username or password' });
    }

    if (user.password !== password) {
      return res.status(400).json({ success: false, error: 'Invalid username or password' });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error logging in user' });
  }
});

app.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne(
      { _id: userId },
      'username name surname email purchasedItems profileImage'
    );

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error fetching user data' });
  }
});


app.put('/user/updateProfileImage', async (req, res) => {
  const { userId, profileImage } = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, { profileImage });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error updating profile image' });
  }
});


const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
