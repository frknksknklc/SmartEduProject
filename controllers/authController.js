const bcrypt = require('bcrypt')
const User = require('../models/User')
const Category = require('../models/Category');
const Course = require('../models/Course');



exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.redirect('/login')
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    })

  }
}

// exports.loginUser = async (req, res) => {
//   try {
//     const {
//       email,
//       password
//     } = req.body;

//     await User.findOne({
//       email
//     }, (err, user) => {
//       if (user) {
//         bcrypt.compare(password, user.password, (err, same) => {
//           if (same) {
//             // USER SESSION
//             req.session.userID = user._id;

//             res.status(200).redirect('/');
//           }
//         });
//       }
//     });
//   } catch (error) {
//      res.status(400).json({
//        status: 'fail',
//        error,
//      });
//   }
// }


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user=  await User.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        
          // USER SESSION
          req.session.userID = user._id;
          res.redirect('/users/dashboard');
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.logoutUser = (req,res) =>{
  req.session.destroy(()=>{
    res.redirect('/')
  })
}

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({_id : req.session.userID}).populate('courses')
  const categories = await Category.find()
  const courses = await Course.find({user:req.session.userID})
  res.status(200).render('dashboard',{
    page_name: 'dashboard',
    user,
    categories,
    courses
  });
}
