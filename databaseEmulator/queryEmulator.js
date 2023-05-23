obj = {
  select: "Select ID,USERNAME,EMAIL,PHONE from USER where ID=?",
  insert: "Insert into USER SET?",
  select2: "Select ID,USERNAME,EMAIL,PHONE from USER",
  select3: "Select ID,USERNAME,EMAIL,PHONE from USER where EMAIL=?",
  update: "Update USER SET ? where ID=?",
  deleteData: "Delete from  USER  where ID=?",
};

module.exports = { obj };
