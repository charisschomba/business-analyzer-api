import requireLogin from "../middlewares/requireLoggin";
import {Router} from "express";
import async from 'async';
import parse from 'csv-parse';


import fs from 'fs';
import Bill from "../models/bill";

const router = Router();

router.post('/upload', (req, res) => {
  const fileType = req.files.csv.name.split('.')[1]
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({message: 'No files were uploaded.'})
  }
  if (fileType !== 'csv') {
    return res.status(409).json({message: 'Only csv files are allowed'})
  }


  console.log('req.files >>>', req.files.csv);

  let businessCsv = req.files.csv;
  let uploadPath =  '/tmp/' + businessCsv.name;

  businessCsv.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    var csvData=[];
    fs.createReadStream(uploadPath)
      .pipe(parse({delimiter: ':'}))
      .on('data', function(csvrow) {
        csvData.push( csvrow[0].split(','));
      })
      .on('end',function() {
        return res.status(200).json({message: 'file uploaded to successfully', data: csvData})
      });
  });
});

export default router;
