// Parses uploaded csv file
const processUpload = async (req, res, next) => {
  // Get file type
  const fileType = req.files && req.files.csv.name.split('.')[1]
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.
    status(400).
    json({error: 'No files were uploaded.'})
  }
  if (fileType !== 'csv') {
    return res.
    status(409).
    json({error: 'Only csv files are allowed'})
  }
  try {
    let businessCsv = req.files.csv;
    let uploadPath = '/tmp/' + businessCsv.name;

    // move file to tmp folder
    businessCsv.mv(uploadPath,  async function(err) {
      if (err) {
        return res.
        status(500).
        json({ error: 'Something went wrong try again'});
      }
      req.filePath = uploadPath;
      next();
    });
  } catch (e) {
    return res.
    status(500).
    json({error: 'Something went wrong'})
  }
};
module.exports = processUpload;
