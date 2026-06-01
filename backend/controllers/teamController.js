import { randomUUID } from "crypto";
import { uploadImageToS3 } from "../utils/s3Upload.js";
import { PutCommand, ScanCommand, getDocumentClient, tableNames } from "../utils/dynamo.js";

const client = getDocumentClient();

const normalizeTeamMember = (member) => ({
  ...member,
  _id: member._id || member.teamId,
});

// @desc    Add new team member
// @route   POST /api/team
export const addTeamMember = async (req, res) => {
  try {
    const { name, role, about, social } = req.body;

    const parsedSocial = social ? JSON.parse(social) : {};
    const uploadedImage = req.file ? await uploadImageToS3(req.file, "team") : null;
    const teamId = randomUUID();

    const newMember = normalizeTeamMember({
      teamId,
      _id: teamId,
      name,
      role,
      about,
      image: uploadedImage?.url || "",
      imageKey: uploadedImage?.key || "",
      social: parsedSocial,
      createdAt: new Date().toISOString(),
    });

    await client.send(
      new PutCommand({
        TableName: tableNames.teams,
        Item: newMember,
      })
    );

    const savedMember = newMember;
    res.status(201).json(savedMember);
  } catch (error) {
    res.status(500).json({ message: "Error adding member", error: error.message });
  }
};

// @desc    Get all team members
// @route   GET /api/team
export const getTeamMembers = async (req, res) => {
  try {
    const response = await client.send(
      new ScanCommand({
        TableName: tableNames.teams,
      })
    );

    const members = (response.Items || []).map(normalizeTeamMember);
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: "Error fetching members", error: error.message });
  }
};
