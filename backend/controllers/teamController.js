import Team from "../models/TeamModel.js";

// @desc    Add new team member
// @route   POST /api/team
export const addTeamMember = async (req, res) => {
  try {
    const { name, role, about, social } = req.body;

    const parsedSocial = social ? JSON.parse(social) : {};

    const newMember = new Team({
      name,
      role,
      about,
      image: req.file ? `/uploads/${req.file.filename}` : "",
      social: parsedSocial,
    });

    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (error) {
    res.status(500).json({ message: "Error adding member", error: error.message });
  }
};

// @desc    Get all team members
// @route   GET /api/team
export const getTeamMembers = async (req, res) => {
  try {
    const members = await Team.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: "Error fetching members", error: error.message });
  }
};
