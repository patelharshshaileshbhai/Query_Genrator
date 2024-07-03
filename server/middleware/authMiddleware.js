// middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

 const auth = async(req, res, next) => {
    try {
        const token=req.headers.token;
        if (!token) {
            return res.status(403).json({
                message: "Login First"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user=await User.findById(decoded.id);

        next();

    } catch (error) {
        res.status(500).json({
             message:"Login First"
        })
    }
}


const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ msg: 'Not authorized as admin' });
  }
};

export { auth, admin };
