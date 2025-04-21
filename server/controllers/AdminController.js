const User = require('../models/user');
const Community = require('../models/community');

const isAdminOfCommunity = (user, communityId) => {
  return user.communities.some((comm) => {
    return (
      comm.communityId._id.toString() === communityId.toString() &&
      comm.role === 'admin'
    );
  });
};

const removeUserFromCommunity = async (req, res) => {
  try {
    const { userId, communityId } = req.body;
    const admin = await User.findById(req.user._id).populate('communities.communityId');

    if (!admin || !isAdminOfCommunity(admin, communityId)) {
      return res.status(403).json({ message: 'You are not authorized to remove users from this community' });
    }

    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    const userToRemove = community.members.find(member => member.userId.toString() === userId);
    if (!userToRemove) {
      return res.status(404).json({ message: 'User not found in this community' });
    }

    community.members = community.members.filter(member => member.userId.toString() !== userId);
    await community.save();

    await User.updateOne(
      { _id: userId },
      { $pull: { communities: { communityId } } }
    );

    return res.status(200).json({ message: 'User removed successfully from the community' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const changeRole = async (req, res) => {
  try {
    const { userId, communityId, newRole } = req.body;

    const admin = await User.findById(req.user._id).populate('communities.communityId');

    if (!admin || !isAdminOfCommunity(admin, communityId)) {
      return res.status(403).json({ message: 'You are not authorized to change roles in this community' });
    }

    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    const member = community.members.find(member => member.userId.toString() === userId);
    if (!member) {
      return res.status(404).json({ message: 'User not found in this community' });
    }

    member.role = newRole;
    await community.save();

    await User.updateOne(
      { _id: userId, "communities.communityId": communityId },
      { $set: { "communities.$.role": newRole } }
    );

    return res.status(200).json({ message: 'User role updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { removeUserFromCommunity, changeRole };
