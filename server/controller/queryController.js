import Query from '../models/Query.js';
import sendEmail from '../middleware/sendMail.js';
const createQuery = async (req, res) => {
  const { title, description } = req.body;

  try {
    const query = new Query({
      user: req.user.id,
      title,
      description,
    });

    await query.save();
    res.status(201).json(query);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

const getAllQueries = async (req, res) => {
  try {
    const queries = await Query.find().populate('user', 'name email');
    res.status(200).json({message:'Queries fetched successfully',queries});
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

const updateQuery = async (req, res) => {
  const { status } = req.body;

  try {
    let query = await Query.findById(req.params.id).populate('user', 'email');

    if (!query) {
      return res.status(404).json({ msg: 'Query not found' });
    }

    query.status = status;
    await query.save();

    // Send email notification
    const emailSubject = `Your query status has been updated`;
    const emailText = `Dear User,\n\nYour query titled "${query.title}" has  "${status}".\n\nThank you.`;
    await sendEmail(query.user.email, emailSubject, emailText);

    res.json(query);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};


export { createQuery, getAllQueries, updateQuery };
