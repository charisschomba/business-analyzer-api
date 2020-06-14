// Parses uploaded csv file
const processUpload = async (req, res, next) => {
  // Get file type
  const fileType = req.files && req.files.csv.name.split('.')[1]
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.
    status(400).
    json({message: 'No files were uploaded.'})
  }
  if (fileType !== 'csv') {
    return res.
    status(409).
    json({message: 'Only csv files are allowed'})
  }
  try {
    let businessCsv = req.files.csv;
    let uploadPath = '/tmp/' + businessCsv.name;

    // move file to tmp folder
    businessCsv.mv(uploadPath,  async function(err) {
      if (err) {
        return res.
        status(500).
        json({ errors: 'Something went wrong try again'});
      }
      req.filePath = uploadPath;
      next();
    });
  } catch (e) {
    return res.
    status(500).
    json({message: 'Something went wrong'})
  }
};
module.exports = processUpload;
