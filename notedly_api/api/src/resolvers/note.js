
//queries or mutations for notes
module.exports = {
  //Resolve the author info for a note when requested
  //So you could return like nested query and get fields about author
  author: async (note, args, {models}) => {
    return await models.User.findById(note.author)
  },

  //Resolved the favoritedBy info for a note when requested
  favoritedBy: async(note, args, {models}) => {
    return await models.User.find({_id: {$in: note.favoritedBy}});
  }
};
